import { useUsersContext } from "../hooks/useUsersContext";

const User = ({ user }) => {
  const { id, username } = user;

  const { users, setUsers } = useUsersContext();

  const handleDelete = (id) => {
    const filteredUsers = users.filter((userid) => userid.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <articale className="user">
      <p>{id}</p>
      <h2>{username}</h2>
      <button style={{ background: "green", color: "white" }} onClick={() => handleDelete(id)}>Delete</button>
    </articale>
  );
};

export default User;
