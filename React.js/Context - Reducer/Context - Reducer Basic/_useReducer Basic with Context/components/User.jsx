import { useUsersContext } from "../hooks/useUsersContext";

const User = ({ user }) => {
  const { id, username } = user;

  const { state, dispatch } = useUsersContext();

  const handleDelete = (id) => {
    dispatch({type: 'DELETE_USER', payload: id});
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
