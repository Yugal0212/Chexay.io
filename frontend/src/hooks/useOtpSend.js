import { useState } from 'react'
import toast from 'react-hot-toast'
function useOtpSend() {
  const [loading,setLoading] = useState(false);
  const otpSend = async({username,email})=>{
    const success = handleInputError({username,email})
    if(!success) return
    setLoading(true);
    try {
        const res = await fetch(`/authentication/otp`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,email})
        })
        const ans = await res.json()
        if(ans.error){
            throw new Error(ans.error)
        }
        toast.success("otp sent successfully")
    } catch (error) {
        toast.error(error.message)
        return
    }finally{
        setLoading(false);
    }
  }
  return {otpSend, loading}
}

export default useOtpSend

function handleInputError({username,email}){
    if(!username || !email){
        toast.error("please enter username or email")
        return false;
    }

    if(username.length < 6){
        toast.error("username should be at least 6 characters long")
        return false;
    }

    // if(password.length < 6){
    //     toast.error("password should be at least 6 characters long")
    //     return false;
    // }
    return true;
}