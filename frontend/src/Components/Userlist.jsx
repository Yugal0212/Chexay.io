// UsersList.js
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

function UsersList({ searchTerm, users, setSelectedFriend }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user.name === selectedUser ? null : user.name);
    setSelectedFriend(user); // Pass clicked user to the parent component
  };

  const filteredUsers = users.filter(async (user) =>
    await user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
      {filteredUsers.map((user) => (
        <React.Fragment key={user.id}>
          <div
            className={`sidebar-item ${selectedUser === user.name ? 'selected' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="user-icon-container">
              <Image src={user.icon} roundedCircle className="user-icon" />
              {user.online && <span className="online-dot"></span>}
            </div>
            <div className="user-info">
              <h6 className="user-name">{user.name}</h6>
              <p>{user.message}</p>
            </div>
          </div>
          <hr className="user-separator" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default UsersList;
