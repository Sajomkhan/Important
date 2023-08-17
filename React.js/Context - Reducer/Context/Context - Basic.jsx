// -------------------------------src/context/UserContext.jsx---------------------------------- //

import { createContext } from "react";
import { useState } from "react";

export const UsersContext = createContext({});


// Provider: Provide to Children Components
const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, username: "Jon Doe" },
    { id: 2, username: "Alexander" },
  ]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
        {children}
    </UsersContext.Provider>
  );
};
export default UsersProvider


// -------------------------------src/context/useUserContext.jsx---------------------------------- //

// useUserContext Hooks
import { useContext } from "react"
import { UsersContext } from "../context/UsersContext"

export const useUsersContext = () => {
    return useContext(UsersContext)
}


// -------------------------------src/App.jsx---------------------------------- //

import Users from "./components/Users";
import "./App.css";
import NewUser from "./components/NewUser";
import UsersProvider from "./context/UsersContext";

function App() {
  return (
    <UsersProvider>
      <div style={{ margin: "4rem" }}>
        <NewUser />
        <Users />
      </div>
    </UsersProvider>
  );
}
export default App;


// -------------------------------src/component/Users---------------------------------- //

import { useUsersContext } from '../hooks/useUsersContext';
import User from './User'

const Users = () => {

  const { users } = useUsersContext();

  return (
    <section className='users'>
      {users.map(user => <User key={user.id} user={user} />)}        
    </section>
  )
}

export default Users


// -------------------------------src/component/User---------------------------------- //

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
      <button
        style={{ background: "green", color: "white" }}
        onClick={() => handleDelete(id)}>
        Delete
      </button>
    </articale>
  );
};

export default User;


// -------------------------------src/component/NewUser---------------------------------- //

import { useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext";

const NewUser = () => {
  const [userName, setUserName] = useState("");

  const { setUsers } = useUsersContext();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserName = {
      id: new Date().getTime().toString(),
      username: userName,
    };
    setUsers((previousUser) => [...previousUser, newUserName]);
    setUserName("");
  };

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
        <button
          style={{ marginLeft: "20px", background: "green", color: "white" }}>
          Add user
        </button>
      </form>
    </div>
  );
};

export default NewUser;




// -------------------------------src/component/Users---------------------------------- //
// -------------------------------src/component/Users---------------------------------- //
// -------------------------------src/component/Users---------------------------------- //