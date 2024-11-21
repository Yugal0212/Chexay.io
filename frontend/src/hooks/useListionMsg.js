import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext"

function useListionMsg({ massage}) {
  const {socket} = useSocketContext();
  const [message,setMessage] = useState(massage ||[])
  useEffect(()=>{
    socket?.on('newMessage',(newMessage)=>{
        setMessage([...message,newMessage])
    })
    return () => socket?.off('newMessage');
  },[socket,setMessage,message])
  return{message}
}

export default useListionMsg