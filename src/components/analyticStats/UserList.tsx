import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.image} alt={user.name} />
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
