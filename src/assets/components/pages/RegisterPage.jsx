import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import register from '../src/ApiServices/AuthService';
// import register from "../../../ApiServices/AuthService/AuthService";
import { register, LogIn } from "../../../ApiServices/AuthService";

const RegisterPage = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRegisterClick = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    const { jwt, success } = await register({ username, password });

    if (success) {
      localStorage.setItem('car-app-jwt', jwt);
      // setUser(jwt); // Need to add setUser function
      navigate('/home');
    } else {
      alert('Error registering');
    }
  }

  return (
    <div className='register--body--container'>
      <div className='register--container'>
        <Form onSubmit={handleRegisterClick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange={handleUsernameChange} // Added onChange event listener
              value={username} // Controlled component
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={handlePasswordChange} // Added onChange event listener
              value={password} // Controlled component
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p><a href='/'>Back to login page.</a></p>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage;

