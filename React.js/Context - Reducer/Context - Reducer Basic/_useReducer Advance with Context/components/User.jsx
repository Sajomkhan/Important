import { useUsersContext } from "../hooks/useUsersContext";

const User = ({ user }) => {
  const { id, username } = user;

  const { deleteUser } = useUsersContext();

  const handleDelete = (id) => {
    deleteUser(id)
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
