import React, { useState } from "react";

const NewUser = ({setUsers}) => {
  const [userName, setUserName] = useState("");

  const handleUserNameChange =(e) => {
    setUserName(e.target.value);
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    const newUserName = { id: new Date().getTime().toString(), username: userName}
    setUsers((previousUser)=> [...previousUser, newUserName]);
    setUserName("")
  }

  return (
    <div style={{ marginBottom: "20px" }}>
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
        <button style={{ marginLeft: "20px", background: "gray" }}>
          Add user
        </button>
      </form>
    </div>
  );
};

export default NewUser;
