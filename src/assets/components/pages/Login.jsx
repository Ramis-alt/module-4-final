import React from 'react'

//instead of those p elements I will render two components
//the left side will have a description of the app
//the right side will have a login form and a link to the register page

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    
    console.log('username:', username)
    console.log('password)', password)
  }
  return (
    <div className='login--body--container'>
      <div className='login--container'>
        <div className='left--side--container'>
          <h1>Tusker</h1>
          <p>Create & edit tasks with ease</p>
        </div>
        <div className='right--side--container'>
          <form onSubmit={handleSubmit}>
            <div className='form--group'>
              <label htmlFor='username'>Username</label>
              <input type='text' className='form--control' id='username' onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='form--group'>
              <label htmlFor='password'>Password</label>
              <input type='password' className='form--control' id='password' onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='btn btn-primary edit--login-button'>Login</button>
            <p className='align--login--text'>Don't have an account? <a href='/register'>Register</a></p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
