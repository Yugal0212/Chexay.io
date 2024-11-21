import React, { useState } from 'react';  
import { useForm } from 'react-hook-form';
import '../styles/authentication.css';
import useForgotPassword from '../hooks/useForgotPassword';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const {sendOtp,resetPassword}= useForgotPassword();
  const { register, handleSubmit, formState: { errors }, watch, clearErrors } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill('')); 
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState({
    email:'',
    otp:'',
    newPassword:'',
    confirmPassword:''
  });

  const handleOtpInput = (index, event) => {
    const { value } = event.target;
    if (/[^0-9]/.test(value)) return;  // Allow only numbers
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move focus to the next OTP input
    if (index < 3 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = () => {
    setShowOtp(true);
    toast.promise(
      sendOtp({email:input.email}),
       {
         loading: 'OTP sending ...',
         success: <b>Otp sent successfully</b>,
         error: <b>Samthing Missing</b>,
       }
     );
    
  };

  const onSubmit = (data) => {
    setSubmitted(true);
    input.otp = otp.join(''); // Combine OTP input to form final OTP
    toast.promise(
      
      resetPassword({email:input.email,password:input.password,otp:input.otp,confirmPassword:input.confirmPassword}),
       {
         loading: 'Please wait...',
         
       }
     );
    
    
    // Here, you can add the logic to submit the form after OTP is verified
  };

  const newPassword = watch("password");

  return (
    <div className="app-bg-container">
      <div className="glass-container">
        <div className="auth-header">Reset Password</div>

        <form onSubmit={handleSubmit(onSubmit)} style={{padding:'20px'}}>
    <div className="auth-text" >Enter Email</div>
    <div className="input-container">
        <input
            className="auth-input"
            type="email"
            {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address"
                }
            })}
            placeholder="Enter Email"
            onChange={(e)=>{setInput({...input,email: e.target.value})}}
        />
        <button type="button" className="verify-email-btn"  id="verify-btn" onClick={handleVerifyOtp}>
             OTP
        </button>
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
                    onChange={(e) => handleOtpInput(idx, e)}
                />
            ))}
        </div>
    )}

    <div className="auth-text">New Password</div>
    <div style={{ position: 'relative', width: '100%',  }}>
        <input
            className="auth-input"
            type={showPassword ? 'text' : 'password'}
            {...register("password", {
                required: "Password is required",
            })}
            placeholder="New Password"
            onChange={(e) => setInput({...input, password: e.target.value})}
        />
        <button type="button" className="show-password-btn" onClick={() => setShowPassword(!showPassword)}
          style={{color: '#007BFF'}}
          >
            {showPassword ? 'Hide' : 'Show'}
        </button>
    </div>
    

    <div className="auth-text"style={{ marginTop: '20px' }}>Confirm Password</div>
          <div className="input-container"  style={{ marginTop: '10px' }}>
            <input
              className="auth-input"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match"
              })}
              placeholder="Confirm Password"
              onFocus={() => clearErrors("confirmPassword")}
              onChange={(e)=>{setInput({...input,confirmPassword: e.target.value})}}
            />
          </div>


    <button type="submit" className="auth-button" id='auth-btn'>Reset Password</button>
</form>

        <div className="auth-links">
          <a href="/login">Back to Login</a>
          <span className="divider">|</span>
          <a href="/signup">Create Account</a>
        </div>
      </div>
    </div>
  );
}
