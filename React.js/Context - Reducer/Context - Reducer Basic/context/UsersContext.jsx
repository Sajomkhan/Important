// ---------create UsersContext-------------------- //
import { createContext } from "react";

export const UsersContext = createContext({});


// ---------Provider: Provide to Children Components-------------- //
import { useReducer } from "react";
import { initialState, reducer } from "../reducer/usersReducer";

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer( reducer, initialState )

  const value = {
    users: state.users,
    addUser: (newUser) => { dispatch({type: 'ADD_USER', payload: newUser})},
    deleteUser: (id) => { dispatch({type: 'DELETE_USER', payload: id})}
  }

  return (
    <UsersContext.Provider value={value}>
        {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider
