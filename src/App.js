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

  const handleAddUser = () => {
    setUsers(prevUsers => [
      ...prevUsers,
      { id: prevUsers.length + 1, name: `User ${prevUsers.length + 1}` }
    ]);
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
