import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function useFriendList() {
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/friendList`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (res.status === 404) {
                    setFriends([]);  // Clear friends if no data is found
                    throw new Error('please add a friend')
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setFriends(data);
            } catch (error) {
                toast.error(error.message);
                return
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []); // Dependency array is empty, so this runs only once when the component mounts

    return { friends, loading };
}

export default useFriendList;
