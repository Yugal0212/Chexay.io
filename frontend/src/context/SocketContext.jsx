import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import {useAuthContext} from './AuthContext'
 const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext);
}
export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUser,setOnlineUser] = useState([]);
    const {authUser} = useAuthContext()
    const [massage,setMassage] = useState(null)

    useEffect(() => {
        if (authUser) {
            const socket = io(`https://chexay-chatapp.onrender.com`, {
                query: { userId: authUser._id }
            });
    
            setSocket(socket);
    
            socket.on('getOnlineUser', (user) => {
                setOnlineUser(user);
            });
            socket.on('newMessage', (message) => {
                setMassage(message.message);
                // Update the message list or display it in the UI accordingly
            })
    
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Add authUser as a dependency
    

    return <SocketContext.Provider value={{socket,onlineUser,massage}}>{children}</SocketContext.Provider>
}