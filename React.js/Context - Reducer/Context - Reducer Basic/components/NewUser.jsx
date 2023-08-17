import {  useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext";

const NewUser = () => {
    const [userName, setUserName] = useState("");
    
    const { addUser } = useUsersContext();

  const handleUserNameChange =(e) => {
    setUserName(e.target.value);
  }
 
  const handleSubmit =(e) => {
    e.preventDefault();
    const newUserName = { id: new Date().getTime().toString(), username: userName}
    addUser(newUserName)
    setUserName("")
  }

  return (
    <div style={{ marginBottom: "60px" }}>
      <h2>User Registration</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userName}
          style={{ padding: "10px", width: "20rem" }}
          onChange={handleUserNameChange}
          required
        />
        <button style={{ marginLeft: "20px", background: "green", color: "white" }}>
          Add user
        </button>
      </form>
    </div>
  );
};

export default NewUser;
