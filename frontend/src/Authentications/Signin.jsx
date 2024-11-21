// Login.js
import React, { useState } from 'react';
import '../styles/authentication.css';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Loading from '../utils/Loading';
import Chexaylogo from '../Images/Chexay.io.png';
import toast from 'react-hot-toast';

export default function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      login(input),
      {
        loading: 'Please wait...',
        success: <b>Login successful!</b>,
        error: <b>Something missing!</b>,
      }
    );
  };

  return (
    <div className="app-bg-container">
      <div className="glass-container">
        {/* Logo */}
        <img
          src={Chexaylogo}
          alt="Chexay"
          className="auth-logo"
        />
        <div className="auth-header">Welcome To Chexay</div>
        <p className="auth-subtitle" style={{ color: 'white' }}>Please login to your account</p>

        <div className="auth-text"style={{marginLeft:'29px'}}>Email or Username</div>
        <div className="input-container">
          <input
            className="auth-login"
            type="text"
            placeholder="Enter Email or Username"
            aria-label="Email or Username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
        </div>

        <div className="auth-text" style={{marginLeft:'29px'}}>Password</div>
        <div className="input-container">
          <input
            className="auth-login"
            type="password" // Keep it as 'password' without dynamic type
            placeholder="Enter Password"
            aria-label="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>

        <div className="auth-checkbox">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <button className="otp-btn" id="auth-btn" onClick={handleSubmit}>Login</button>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span className="divider">|</span>
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
