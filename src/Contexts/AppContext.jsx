import React, { createContext, useState, useEffect } from "react";

const initialStates = {
  AditionphasesList: [{}],
  totalPoints: 0,
  setAditionphasesList: Function,
  setTotalPoints: Function,
  setStorage: Function,
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

  function setStorage(key, value) {
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
        setStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
