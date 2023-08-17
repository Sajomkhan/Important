import { useState } from "react";
import Users from "./components/Users";
import "./App.css";
import NewUser from "./components/NewUser";

function App() {
  const [users, setUsers] = useState([
    { id: 1, username: "Jon Doe" },
    { id: 2, username: "Alexander" },
  ]);

const handleDeleteUsers = (id) =>{
  const filteredUsers = users.filter(user => user.id !== id)
  setUsers(filteredUsers)
}

  return (
    <div style={{margin:'4rem'}}>
      <NewUser setUsers={setUsers}/>
      <Users users={users} handleDeleteUsers={handleDeleteUsers}/>
    </div>
  );
}

export default App;
