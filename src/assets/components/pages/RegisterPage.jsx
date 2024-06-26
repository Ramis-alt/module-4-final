import React from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { register } from "../../../ApiServices/AuthService";
import { setUser } from "../../../ApiServices/UserService";
import { setJwt } from "../../../ApiServices/JwtService";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import alertSound from '../../../../src/sounds/You-didnt-say-the-magic-word.m4a';


const RegisterPage = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRegisterClick = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (!username || !password) {
      setShowModal(true);

      const audio = new Audio(alertSound);
      audio.play();

      return;
    }

    const { jwt, success } = await register({ username, password });

    if (success) {
      localStorage.setItem('task-app-jwt', jwt);
      setJwt(jwt);
      setUser(jwt);
      navigate('/main');
    } else {
      alert('Error registering');
    }
  }

  const handleCloseModal = () => setShowModal(false);
  return (
    <div className='register--body--container'>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className='alert--edit' src="/src/images/you-didnt-say-the-magic-word-ah-ah.gif" alt="Alert" />
          <p>You didn't say the magic word!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='register--container'>
        <Form onSubmit={handleRegisterClick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => handleUsernameChange(event)} // Added onChange event listener
              value={username} // Controlled component by state 
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
              onChange={(event) => handlePasswordChange(event)} // Added onChange event listener
              value={password} // Controlled component
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p><Link to='/'>Back to login page.</Link></p>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage;

