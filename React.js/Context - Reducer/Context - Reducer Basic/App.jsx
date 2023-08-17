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
