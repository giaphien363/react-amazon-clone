import React, { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

// prepares the data layer
export const StateContext = createContext();

// wrap our app and procide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// pull information from the data layer
export const useStateValue = () => useContext(StateContext);
