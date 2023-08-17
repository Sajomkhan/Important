// ---------create UsersContext-------------------- //
import { createContext } from "react";

export const UsersContext = createContext({});


// ---------Provider: Provide to Children Components-------------- //
import { useReducer } from "react";
import { initialState, reducer } from "../reducer/usersReducer";

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer( reducer, initialState )

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
        {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider
