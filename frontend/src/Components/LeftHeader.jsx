import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import {FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import '../styles/Leftmenu.css';
import person1png from '../Images/user.jpg';
import useSearchFriends from '../hooks/useSearchFriends';
import useAddFriends from '../hooks/useAddFriends';
import Cookies from 'js-cookie';

function LeftHeader({ addFriendToUserList, userList }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchFriends, results, searchLoading } = useSearchFriends();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const [filteredFriends,setFilteredFriends] = useState([]);
  const {addFriends} = useAddFriends();
  // const friends = [
  //   { id: 1, name: 'yugal patel', message: 'looks good', icon: person1png, online: true },
  //   { id: 2, name: 'Ashley Harris', message: 'lucky you', icon: 'person2.png', online: false },
  //   { id: 3, name: 'Andrew Wilson', message: 'same here', icon: 'person3.png', online: true },
  //   { id: 4, name: 'Jennifer Brown', message: 'wait a second', icon: 'person4.png', online: false },
  //   { id: 5, name: 'Edward Davis', message: "how's it going?", icon: 'person5.png', online: true },
  //   { id: 6, name: 'Karen Wilson', message: 'i hear you', icon: 'person6.png', online: false },
  //   { id: 7, name: 'Joseph Garcia', message: "at least it's friday", icon: 'person7.png', online: true },
  //   { id: 8, name: 'Patricia Jones', message: 'what about you?', icon: 'person8.png', online: false },
  //   { id: 9, name: 'shubham kagathara', message: 'i love it', icon: 'person9.png', online: true },
  //   { id: 10, name: 'David Johnson', message: 'how about you?', icon: 'person10.png', online: false },
  //   { id: 11, name: 'jaydeep popat', message: 'good morning', icon: 'person11.png', online: true },
  //   { id: 12, name: 'Tushar rajapara', message: 'hello', icon: 'person12.png', online: true },
  //   { id: 13, name: 'Sarah Wilson', message: 'how are you?', icon: 'person13.png', online: false },
  //   { id: 14, name: 'Daniel Johnson', message: 'i am good', icon: 'person14.png', online: true },
  //   { id: 15, name: 'Kyle Williams', message: 'good morning', icon: 'person15.png', online: true },
  //   { id: 16, name: 'harsh bhuva', message: 'how are you?', icon: 'person16.png', online: false },
  //   { id: 17, name: 'David Davis', message: 'good morning', icon: 'person17.png', online: true },
  //   { id: 18, name: 'pratik patel', message: 'good morning', icon: 'person18.png', online: true },
  //   { id: 19, name: 'jeet bhalodi', message: 'how are you?', icon: 'person19.png', online: false },
  //   { id: 20, name: 'abhay jakasaniya', message: 'good morning', icon: 'person20.png', online: true },

  //   ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);
  // const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      await searchFriends(query); // Fetch search results only if query has content
      setFilteredFriends(results)      

    }
  };

  const handleAddFriend = (friend) => {
    addFriends(friend);
    addFriendToUserList(friend);
  };

  const handlelogout = ()=>{
    localStorage.removeItem('user-info');
    Cookies.remove('jwt');
    window.location.href = '/login';
  }

  return (
    <div className={`header-container ${showDropdown ? 'show-dropdown' : ''}`}>
      <div className="header">
        <Image src={userInfo.profilepic} roundedCircle className="profile-icon" />
        <h5>{userInfo.username}</h5>
        <div className="lefticons">
          <FaUserPlus className="leftheader-icon add-user-icon" title="Add User" onClick={toggleDropdown} />
          <FaSignOutAlt className="leftheader-icon" title="Logout" style={{cursor:'pointer'}} onClick={handlelogout}/>
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown-menu" id="glass-effect" onMouseLeave={closeDropdown}>
          <input
            type="text"
            className="dropdown-search-bar"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <ul className="friends-list">
            {searchLoading ? (
              <li>Loading...</li>
            ) : (
              filteredFriends
                .filter(friend => !userList.some(user => user.id === friend.id)) // Exclude already-added users
                .map(friend => (
                  <li key={friend.id} className="friend-item">
                    <div className="friend-icon-container">
                      <Image src={friend.icon || person1png} className="friend-icon" roundedCircle />
                      {friend.online && <span className="friend-online-dot"></span>}
                    </div>
                    <div className="friend-info">
                      <h6 className="friend-name">{friend.name}</h6>
                      <p className="friend-message">{friend.message}</p>
                    </div>
                    <FaUserPlus
                      className="add-friend-icon"
                      onClick={() => handleAddFriend(friend)}
                    />
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LeftHeader;
