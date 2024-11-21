import { useState } from "react";
import toast from "react-hot-toast";

function useAddFriends() {
    const [loading, setLoading] = useState(false);

    const addFriends = async (friend) => {
        setLoading(true);
        try {
            const res = await fetch(`/friendList/addfriend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: friend.id, username: friend.username }),
                credentials: "include",
            });

            if (res.status === 401) {
                throw new Error("Please log out and try again.");
            }

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Friend added successfully!");
            } else {
                throw new Error(data.error || "An unknown error occurred.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, addFriends };
}

export default useAddFriends;
