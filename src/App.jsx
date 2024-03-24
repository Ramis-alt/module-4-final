import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useState } from 'react'
import React from 'react'
import './App.css'
import MainPage from './assets/components/pages/MainPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './assets/components/pages/Login';
import RegisterPage from './assets/components/pages/RegisterPage';
//see if you can get rid of the React.Fragment
function App() {
  return (
    <Router>
      <Routes>
        <React.Fragment>
          {/* <Login /> */}
          {/* <MainPage /> */}
          {/* <Register />   */}
          <Route exact path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </React.Fragment>
      </Routes>
    </Router>
  )
}

export default App
