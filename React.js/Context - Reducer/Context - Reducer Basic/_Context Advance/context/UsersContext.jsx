// ---------create UsersContext-------------------- //
import { createContext } from "react";

export const UsersContext = createContext({});


// ---------Provider: Provide to Children Components-------------- //
import { useState } from "react";

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
