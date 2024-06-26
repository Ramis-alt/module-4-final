const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
//bcrypt is a library that hashes passwords
const bcrypt = require('bcrypt');
//body-parser is a library that allows us to parse the body of a request
const bodyParser = require('body-parser');

// Allows us to access the .env
require('dotenv').config();

const app = express();
const port = process.env.PORT; // default port to listen

const corsOptions = {
   origin: '*', 
   credentials: true,  
   'access-control-allow-credentials': true,
   optionSuccessStatus: 200,
}

// Creates a pool of connections to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Allows Express to use the corsOptions
app.use(cors(corsOptions));

// Makes Express parse the JSON body of any requests and adds the body to the req object
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    // Connecting to our SQL db. req gets modified and is available down the line in other middleware and endpoint functions
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
    await req.db.query(`SET time_zone = '-8:00'`);

    // Moves the request on down the line to the next middleware functions and/or the endpoint it's headed for
    await next();

    // After the endpoint has been reached and resolved, disconnects from the database
    req.db.release();
  } catch (err) {
    // If anything downstream throw an error, we must release the connection allocated for the request
    console.log(err)
    // If an error occurs, disconnects from the database
    if (req.db) req.db.release();
    throw err;
  }
});

// Hashes the password and inserts the info into the `user` table
app.post('/register', async function (req, res) {
  console.log(req.body)
  try {
    const { password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`${hashedPassword}`)
    const [user] = await req.db.query(
      `INSERT INTO user_accounts (user_name, user_password)
      VALUES (:username, :hashedPassword);`,
      { username, hashedPassword });

    const jwtEncodedUser = jwt.sign(
      { userId: user.insertId, ...req.body },
      process.env.JWT_KEY
    );
      
    res.json({ jwt: jwtEncodedUser, success: true });
  } catch (err) {
    console.log('error', err);
    res.json({ err, success: false });
  }
});

app.post('/log-in', async function (req, res) {
  try {
    const { username, password: userEnteredPassword } = req.body;
      console.log(req.body );
    const [[user]] = await req.db.query(`SELECT * FROM user_accounts WHERE user_name = :username`, { username });
      console.log(user)
    if (!user) res.json('Username not found');
  
    const hashedPassword = `${user.user_password}`
    // console.log(hashedPassword)
    const passwordMatches = await bcrypt.compare(userEnteredPassword, hashedPassword);

    if (passwordMatches) {
      const payload = {
        userId: user.id,
        username: user.user_name //Changed this to from user.username to user.user_name
      }
      
      const jwtEncodedUser = jwt.sign(payload, process.env.JWT_KEY);

      res.json({ jwt: jwtEncodedUser, success: true });
    } else {
      res.json({ err: 'Password is wrong', success: false });
    }
  } catch (err) {
    console.log('Error in /authenticate', err);
  }
});

// Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function verifyJwt(req, res, next) {
  const { authorization: authHeader } = req.headers;
  
  if (!authHeader) res.json('Invalid authorization, no authorization headers');

  const [scheme, jwtToken] = authHeader.split(' ');

  if (scheme !== 'Bearer') res.json('Invalid authorization, invalid authorization scheme');

  try {
    const decodedJwtObject = jwt.verify(jwtToken, process.env.JWT_KEY);

    req.user = decodedJwtObject;
  } catch (err) {
    console.log(err);
    if (
      err.message && 
      (err.message.toUpperCase() === 'INVALID TOKEN' || 
      err.message.toUpperCase() === 'JWT EXPIRED')
    ) {

      req.status = err.status || 500;
      req.body = err.message;
      req.app.emit('jwt-error', err, req);
    } else {

      throw((err.status || 500), err.message);
    }
  }

  await next();
});
//creates new data for the user title and content and places a placeholder for the title

app.post('/user-new-content', async (req, res) => {
  const { 
    newContentValue,
    newDateValue
  } = req.body;

  const { userId } = req.user;
  const newTitleValue = "New Task"; // hardcoding the placeholder for the title so that it can be updated later
  try {
    const [insert] = await req.db.query(`
    INSERT INTO user_data (title, content, user_id, deleted_flag)
    VALUES (:newTitleValue, :newContentValue, :userId, 0);
  `, { 
    newTitleValue, // placeholder for the title
    newContentValue, // placeholder for the content
    userId, // placeholder for the user id
  });

    // Attaches JSON content to the response
    res.json({
      id: insert.insertId,
      title: newTitleValue,
      content: newContentValue,
  
      created_at: newDateValue
    });
  } catch (err) {
    console.log('Error in /user-new-content', err);
    res.status(500).json({ message: 'Internal Server Error, could not create new content', success: false });
  }
});

//updates existing data for just the title
app.put('/update_title/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title } = req.body;
  try {
    await req.db.query(
      `UPDATE user_data SET title = :title WHERE id = :taskId AND deleted_flag = 0;`, 
      { title, taskId }
    );

    res.json({ success: true });
  } catch (err) {
    console.log('Error updating task title:', err);
    res.status(500).json({ message: 'Internal Server Error, could not update task title', success: false });
  }
});

app.put('/update_content/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;
  try {
    await req.db.query(
      `UPDATE user_data SET content = :content WHERE id = :taskId AND deleted_flag = 0;`, 
      { content, taskId }
    );

    res.json({ success: true });
  } catch (err) {
    console.log('Error updating task content:', err);
    res.status(500).json({ message: 'Internal Server Error, could not update task content', success: false });
  }
});


// Creates a GET endpoint at <WHATEVER_THE_BASE_URL_IS>/user-content
app.get('/user-content', async (req, res) => {
  try {
    const { userId } = req.user;

    const [userData] = await req.db.query(`SELECT * FROM user_data WHERE user_id = :userId AND deleted_flag = 0;`, { userId });

    // Attaches JSON content to the response
    res.json({ userData });
  } catch (error) {
    console.error('Error fetching user content:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user content' });
  }
});

//link to dropdowm menu in the front end
app.delete('/delete_content/:id', async (req, res) => {
  const { id: contentId } = req.params;

  try {
    await req.db.query(`
      UPDATE user_data 
      SET deleted_flag = 1 
      WHERE id = :contentId
    `, { contentId });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ success: false, error: 'Failed to delete content' });
  }
});
// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});