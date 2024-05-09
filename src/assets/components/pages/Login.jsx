import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { setUser } from '../../../ApiServices/UserService'
import { LogIn } from '../../../ApiServices/AuthService'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    const { jwt, success } = await LogIn({ username, password });
    if (success) {
      localStorage.setItem('task-app-jwt', jwt);
      setUser(jwt);
      navigate('/main');
    } else {
      alert('Error logging in');
    }
  }
  return (
    <div className='login--body--container'>
      <div className='login--container'>
        <div className='left--side--container'>
          <h1>Tusker</h1>
          <p>Create & edit tasks with ease</p>
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
