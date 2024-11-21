import React, { useEffect, useState } from 'react';
import LeftHeader from './LeftHeader';
import SearchBar from './Serchbar';
import UsersList from './Userlist';
import '../styles/Leftmenu.css';
import useFriendList from '../hooks/useFriendList';
import { useSocketContext } from '../context/SocketContext';

function LeftMenu({ setSelectedFriend }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { friends } = useFriendList();
    const { onlineUser } = useSocketContext(); // Ensure onlineUser is an array

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        
        const onlineUserSet = new Set(onlineUser.map(user => user.id));
        const mappedFriends = friends.map((friend) => ({
            id: friend._id,
            name: friend.username,
            online: onlineUserSet.has(friend._id), // Efficient lookup
            icon: friend.profilepic,
            message: 'Hello there!',
        }));
        
        setUserList(mappedFriends);
    }, [friends, onlineUser]);

    const addFriendToUserList = (friend) => {
        if (!userList.some(user => user.id === friend.id)) {
            setUserList((prevList) => [...prevList, friend]);
        }
    };

    return (
        <div className="sidebar">
            <LeftHeader addFriendToUserList={addFriendToUserList} userList={userList} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <UsersList searchTerm={searchTerm} users={userList} setSelectedFriend={setSelectedFriend} />
        </div>
    );
}

export default LeftMenu;
