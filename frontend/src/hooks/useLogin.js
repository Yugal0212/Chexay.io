import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
function useLogin() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()
  const login = async({username,password})=>{
    
    const success = handleInputError({username,password})
    if(!success) return

    setLoading(true);
    try {
        const res = await fetch(`/authentication/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password}),
            credentials: 'include'
        })
        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem('user-info',JSON.stringify(data));
        setAuthUser(data); 
        Cookies.set('myCookie', 'myValue', { expires: 15 });
    } catch (error) {
       toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }
  return { login, loading }  // return the signup function and loading state as props to the component.  This component will call the signup function when the user clicks the signup button.  The loading state will be used to show a loading spinner while the signup process is in progress.  The setAuthUser function will be used to update the authUser context when the user is successfully authenticated.  The handleInputError function will be used to validate the input fields before attempting to signup.
}

export default useLogin


function handleInputError({username,password}){
    if(!username || !password){
        toast.error("please enter all filled")
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