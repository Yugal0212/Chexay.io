import { useAuthContext } from '../context/AuthContext';

function useLogOut() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext() || undefined
  const logout = async ()=>{
    setLoading(true);
    try {
        const res = await fetch(`/authentication/logout`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.removeItem('user-info');
        setAuthUser(null);
    } catch (error) {
        console.error("Error in logout",error);
    } finally{
        setLoading(false);
    }
  }
}

export default useLogOut