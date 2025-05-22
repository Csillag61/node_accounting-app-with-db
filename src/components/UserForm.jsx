import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'http://localhost:5001/users';

export default function UserForm({ onUserCreated }) {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      return;
    }

    try {
      const res = await axios.post(API_URL, { name: userName });

      onUserCreated(res.data);
      setUserName('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
}

UserForm.propTypes = {
  onUserCreated: PropTypes.func.isRequired,
};
