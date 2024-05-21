import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { setUser } from '../../../ApiServices/UserService'
import { LogIn } from '../../../ApiServices/AuthService'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import alertSound from '../../../../src/sounds/You-didnt-say-the-magic-word.m4a';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  //did the handleLogin function and the form onSubmit event listener in order to enable user to press enter to submit the form
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission action, prevents page from refreshing

    // Check if username and password are empty
    if (!username || !password) {
      setShowModal(true);

      const audio = new Audio(alertSound);
      audio.play();

      return;
    }

    const { jwt, success } = await LogIn({ username, password });
    if (success) {
      localStorage.setItem('task-app-jwt', jwt);
      setUser(jwt);
      navigate('/main');
    } else {
      alert('Error logging in');
    }
  }

  const handleCloseModal = () => setShowModal(false);
  return (
    <div className='login--body--container'>

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

      <div className='login--container'>
        <div className='left--side--container'>
          <h1>Tusker</h1>
          <p className='description-edit'>Tusker allows you to:</p>
          <p className='description-edit'>Create your tasks with ease!</p>
          <p className='description-edit'>Update your tasks!</p>
          <p className='description-edit'>Delete and rename!</p>
          <img src='./src/images/Tusker-Larger-Login.png' className='login--image--edit' alt='Tusker Logo' />
        </div>
        <div className='right--side--container'>
          <form onSubmit={handleLogin}>
            <div className='form--group'>
              <label htmlFor='username'>Username</label>
              <input type='text' className='form--control' id='username' onChange={(event) => handleUsernameChange(event)} />
            </div>
            <div className='form--group'>
              <label htmlFor='password'>Password</label>
              <input type='password' className='form--control' id='password' onChange={(event) => handlePasswordChange(event)} />
            </div>
            <button type='submit' className='btn btn-primary edit--login-button'>Login</button>
            <p className='align--login--text'>Don't have an account? <Link to='/register'>Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
