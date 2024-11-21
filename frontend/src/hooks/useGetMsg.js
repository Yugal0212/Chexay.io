import { useState } from "react"
import toast from "react-hot-toast";

function useGetMsg() {
  const [loading,setLoading] = useState(false);
  
  const getMsg= async (receiverId) => {
    setLoading(true);
    try {
        const res = await fetch(`/api/${receiverId}`,{
            method: 'GET',
            credentials: 'include'
        })
        if(!res.ok){
            throw new Error('Failed to fetch messages')
        }
        const data = await res.json();
        if(data.noCon){
            toast.error("No conversation with this user")
            return []
        }
        return(data.map((msg)=>{
            return ({
                text:msg.message,
                sender:receiverId!==msg.receiverId ?'other':'user'
            })
        }))   
    } catch (error) {
        toast.error(error.message)
    }finally {
        setLoading(false);
    }
    

  }
  return{loading,getMsg,}
}

export default useGetMsg