import React, { useState } from "react";
import '../styles/authentication.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useOtpSend from "../hooks/useOtpSend";
import Loading from "../utils/Loading";
import useSignUp from "../hooks/useSignUp";
import toast from "react-hot-toast";

export default function Signup() {
  const{otpLoading,otpSend}=useOtpSend()
  const{signupLoadin,signup} = useSignUp()
  const [inputType, setInputType] = useState("password");
  const [otp, setOtp] = useState(Array(4).fill("")); // Manage OTP input
  const [showOtp, setShowOtp] = useState(false); // Control OTP visibility
  const [input,setInput] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
    gender:""
  })

  const genOtp = async ()=>{
    toast.promise(
      otpSend({username:input.username, email:input.email}),
       {
         loading: 'otp Sending...',
         success: <b>Otp Sent Successfully</b>,
         error: <b>Samthing missing</b>,
       }
     );
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    input.otp = otp.join(''); // Combine OTP input to form final OTP
    // Add your logic to validate and send data to the server
    toast.promise(
      signup(input),
       {
         loading: 'Loading...',
         success: <b>Loading Successfully</b>,
         error: <b>Samthing Missing</b>,
       }
     );
    
  }

  const toggleInputType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numbers
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (index < 3 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyClick = () => {
    setShowOtp(true)
    genOtp();
  };

  return (
    <div className="app-bg-container">
      <div className="glass-container">
        <div className="auth-header">Signup</div>

        <form onSubmit={handleSubmit}>
          <div className="auth-text">Username</div>
          <div className="input-container">
            <input
              className="auth-input"
              type="text"
              placeholder="Enter your username"
              value={input.username}
              onChange={(e) =>
                setInput({...input, username: e.target.value })
              }
            />
           
          </div>

          <div className="auth-text">Email</div>
<div className="input-container with-verify">
  <input
    className=" email-input"
    type="email"
    placeholder="Enter your email"
    value={input.email}
    onChange={(e) =>
      setInput({...input, email: e.target.value })
    }
  />
  <div className="verify-email-btn">
      <button type="button" className={'otp-btn'} id="verify-btn" onClick={handleVerifyClick}>
      OTP
      </button>
  </div>
  
  
</div>

          {showOtp && (
            <div className="otp-input-group">
              {otp.map((value, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  className="otp-input"
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(e, idx)}
                />
              ))}
            </div>
          )}

          <div className="auth-text">Password</div>
          <div className="input-container">
            <div className="input-wrapper">
              <input
                className="auth-input"
                type={inputType}
                value={input.password}
                placeholder="Enter your password"
                onChange={(e) =>
                  setInput({...input, password: e.target.value })
                }
              />
              <button type="button" className="show-password-btn" onClick={toggleInputType}>
                <FontAwesomeIcon icon={inputType === "password" ? faEye : faEyeSlash} />
              </button>
            </div>
            
          </div>


          <div className="text-gender" > Select Your Gender</div>
          <div className="gender-container">
            <label className="gender-label male">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={input.gender === "male"}
                onChange={(e) => setInput({ ...input, gender: e.target.value })}
              />
              Male
            </label>
            <label className="gender-label female">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={input.gender === "female"}
                onChange={(e) => setInput({ ...input, gender: e.target.value })}
              />
              Female
            </label>
          </div>


          <div className="auth-button">
            <button type="submit" className="otp-btn" id="auth-btn">Signup</button>
            </div>
        </form>

        <div className="auth-links">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
