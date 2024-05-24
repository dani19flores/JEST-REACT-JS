import React, { useState, useEffect } from 'react';
import { fetchUsers } from './components/api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
    };

    getUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => handleAddUser({ id: users.length + 1, name: `User ${users.length + 1}` })}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;