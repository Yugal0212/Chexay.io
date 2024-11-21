import { useState } from "react";
import toast from "react-hot-toast";

function useSearchFriends() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const searchFriends = async (name) => {
    setLoading(true);
    try {
      if (name.length === 0) {
        toast.error("Please enter a name");
        setLoading(false);
        return;
      }
      const res = await fetch(`/friendList/search/friend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 404) {
        toast.error("Username not found");
        setResults([]);
        return;
      }

      if (res.status !== 200 || data.error) {
        throw new Error(data.error || "An error occurred");
      }
      setResults(()=>{
        return data.map((friend)=>{
            return{
            id: friend._id,
            name: friend.username,
            online: true,
            massage:"",
            icon: friend.profilepic
            }
            
        })
      });
    } catch (error) {
      toast.error(error.message || "An error occurred");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { searchFriends, results, loading };
}

export default useSearchFriends;
