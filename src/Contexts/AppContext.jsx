import React, { createContext, useState, useEffect } from "react";

const initialStates = {
  AditionphasesList: Array,
  totalPoints: 0,
  setAditionphasesList: Function,
  setTotalPoints: Function,
  getLocalStorageValue: Function,
  setLocalStorageValue: Function,
  savedPoints: Number,
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

  // Função para obter um valor do localStorage
  function getLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

  // Função para definir um valor no localStorage
  function setLocalStorageValue(key, value) {
    localStorage.setItem(key, value);
  }

  return (
    <AppContext.Provider
      value={{
        totalPoints: state.totalPoints,
        setTotalPoints: (totalPoints) =>
          updateState("totalPoints", totalPoints),
        AditionphasesList: state.AditionphasesList,
        setAditionphasesList: (AditionphasesList) =>
          updateState("AditionphasesList", AditionphasesList),
        getLocalStorageValue,
        setLocalStorageValue,
        savedPoints: Number(getLocalStorageValue("totalPoints")),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
