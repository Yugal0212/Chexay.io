import {useState} from 'react'
import toast from 'react-hot-toast';
function useForgotPassword() {
  const [loading,setLoading] = useState(false);
  const sendOtp = async ({email})=>{
    console.log(email);
    setLoading(true);
    try {
      const res = await fetch(`/authentication/forgotOtp`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
        credentials: 'include'
      })
      if(!res.ok){
        throw new Error('Failed to send OTP')
      }
      const data = await res.json();  
      if(data.error){
        throw new Error(data.error)
      }
      toast.success("OTP sent successfully")
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  }
  const resetPassword = async ({email, otp,password,confirmPassword})=>{
    setLoading(true);
    if(!chackAuth({email,otp,password,confirmPassword})) {
      return false
    }
    try {
      const res = await fetch(`/authentication/changePassword`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, otp, password}),
          credentials: 'include'
        })
      if(!res.ok){
        throw new Error('Failed to reset password')
      }
      const data = await res.json();
      console.log(data)
      if(data.error){
        throw new Error(data.error)
      }
      toast.success("Password reset successfully")
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  }
  const chackAuth = ({email,otp,password,confirmPassword}) =>{
    if(!email || !otp || !password || !confirmPassword){
      toast.error('Please enter all fields')
      return false;
    }
    if(password !== confirmPassword){
      toast.error('Password and Confirm Password should be same')
      return false;
    }
    if(password.length < 6){
      toast.error('Password must be at least 6 characters')
      return false;
    }
    return true;
  }
  return{loading,sendOtp,resetPassword}
}

export default useForgotPassword