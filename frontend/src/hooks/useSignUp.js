import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function useSignUp() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()
  const signup = async({username,email,otp,gender,password})=>{
    const success = handleInputError({username,email,otp,gender,password})
    if(!success) return
    setLoading(true);
    try {
        const res = await fetch(`/authentication/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,email,otp,gender,password}),
            credentials: 'include'
        })
        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem('user-info',JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        console.error(error)
        toast.error(error.message)
        return;
    } finally{
        setLoading(false);
    }
  }
  return {signup, loading}
}

export default useSignUp


function handleInputError({username,email,otp,gender,password}){
    if(!username || !email || !otp || !gender || !password){
        toast.error('Please enter all fields')
        return;
    }

    if(username.length < 6){
        toast.error('username must be at least 6 characters')
        return ;
    }

    if(password.length < 6){
        toast.error('password must be at least 6 characters')
        return ;
    }
    if(otp.length < 4){
        toast.error('OTP must be 4 digits')
        return ;
    }
    return true;
}