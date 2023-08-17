import { useState } from "react";
import Users from "./components/Users";
import "./App.css";
import NewUser from "./components/NewUser";
import { UsersContext } from "./context/UsersContext";

function App() {
  const [users, setUsers] = useState([
    { id: 1, username: "Jon Doe" },
    { id: 2, username: "Alexander" },
  ]);

  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <div style={{ margin: "4rem" }}>
        <NewUser />
        <Users />
      </div>
    </UsersContext.Provider>
  );
}

export default App;
