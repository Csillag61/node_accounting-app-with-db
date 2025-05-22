import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const API_URL = 'http://localhost:5001/users';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h2>Users</h2>
      <UserForm onUserCreated={handleUserCreated} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
