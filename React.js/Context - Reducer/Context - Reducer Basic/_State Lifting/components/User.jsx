import React from 'react'

const User = ({ user, handleDeleteUsers }) => {
  const { id, username } = user;

  const handleDelete =(id) => {
    handleDeleteUsers(id)
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
