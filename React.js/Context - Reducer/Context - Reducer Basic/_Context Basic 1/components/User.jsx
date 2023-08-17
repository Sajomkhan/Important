import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext';

const User = ({ user }) => {
  const { id, username } = user;

  const {users, setUsers} = useContext(UsersContext);

  const handleDelete =(id) => {
    const filteredUsers = users.filter((userid) => userid.id !== id);
    setUsers(filteredUsers);
  }

  return (
    <articale className='user'>
      <p>{id}</p>
      <h2>{username}</h2>
      <button onClick={()=>handleDelete(id)}>Delete</button>
    </articale>
  );
};

export default User;
