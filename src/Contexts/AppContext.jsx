/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const initialStates = {
  AditionphasesList: Array,
  setAditionphasesList: Function,
  getLocalStorageValue: Function,
  setLocalStorageValue: Function,
};

export const AppContext = createContext(initialStates);

export function AppProvider({ children }) {
  const [state, setState] = useState(initialStates);

  function updateState(key, value) {
    setState({
      ...state,
      [key]: value,
    });
  }

  function getLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

  function setLocalStorageValue(key, value) {
    localStorage.setItem(key, value);
  }

  return (
    <AppContext.Provider
      value={{
        AditionphasesList: state.AditionphasesList,
        setAditionphasesList: (AditionphasesList) =>
          updateState("AditionphasesList", AditionphasesList),
        getLocalStorageValue,
        setLocalStorageValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
