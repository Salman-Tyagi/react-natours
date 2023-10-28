import { useContext, useReducer, useState } from 'react';
import { createContext } from 'react';
import { getCurrentUser } from '../services/apiAuth';

const UserContext = createContext();

const { name, email, photo } = getCurrentUser();

const initialState = {
  name,
  email,
  photo,
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateName':
      return { ...state, name: action.payload };

    case 'updateEmail':
      return { ...state, email: action.payload };

    case 'updatePhoto':
      return { ...state, photo: action.payload };

    default:
      throw Error('Unknown actions');
  }
}

function UserProvider({ children }) {
  const [{ name, email, photo }, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ name, email, photo, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const value = useContext(UserProvider);
  if (value === 'undefined')
    throw Error('UserProvider is used outside of this route');

  return value;
}

export { UserProvider, useUser };
