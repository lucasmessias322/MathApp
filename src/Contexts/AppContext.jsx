import React, { createContext, useState, useEffect } from "react";

const initialStates = {
  totalPoints: 0,
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

  // useEffect(() => {
  //   const TotalsavedPoints = Number(localStorage.getItem("points"));

  //   if (TotalsavedPoints) {
  //     updateState("totalPoints", TotalsavedPoints);
  //   }

  // }, []);

  function setStorage(key, value) {
    localStorage.setItem(key, value);
  }

  return (
    <AppContext.Provider
      value={{
        totalPoints: state.totalPoints,
        setTotalPoints: (totalPoints) =>
          updateState("totalPoints", totalPoints),
        setStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
