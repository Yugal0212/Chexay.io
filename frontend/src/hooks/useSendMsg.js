import { useState } from "react"
import toast from "react-hot-toast";

function useSendMsg() {
  const [loading,setLoading] = useState(false);
  const sendMsg = async(receiverId,msg)=>{
    setLoading(true);
    try {
        const res = await fetch(`/api/sendMsg/${receiverId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({message:msg}),
            credentials: 'include'
        })
        if(!res.ok){
            throw new Error('Failed to send message');
        }
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }
  return{loading,sendMsg}
}

export default useSendMsg