import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import ChatApp from './Pages/Chatapp.jsx';
import Login from './Authentications/Signin.jsx';
import Signup from './Authentications/SIgnup.jsx';
import ForgotPassword from './Authentications/Forgatepass.jsx';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.js';
function App() {
  const {authUser} = useAuthContext()
  return (
    
    <>
      <Routes>
        <Route path="/" element={authUser?<ChatApp />:<Navigate to={'/login'}></Navigate>} />
        <Route path="/signup" element={authUser?<Navigate to={'/'}></Navigate>:<Signup/>} />
        <Route path="/login" element={authUser?<Navigate to={'/'}></Navigate>:<Login />} /> {/* Ensure /login route exists */}
        <Route path="/forgot-password" element={authUser?<Navigate to={'/'}></Navigate>:<ForgotPassword />} />  
    </Routes>
    <Toaster/>
    </>
    
  );
}

export default App;
