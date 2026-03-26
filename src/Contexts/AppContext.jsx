import React, { createContext, useRef, useState } from "react";
import {
  applyAnswerReward,
  applyMilestoneReward,
  getPlayerProfile,
  savePlayerProfile,
} from "../utils/playerProgress";

const initialStates = {
  AditionphasesList: Array,
  totalPoints: 0,
  setAditionphasesList: Function,
  setTotalPoints: Function,
  getLocalStorageValue: Function,
  setLocalStorageValue: Function,
  savedPoints: Number,
  playerProfile: Object,
  refreshPlayerProfile: Function,
  rewardAnswer: Function,
  rewardMilestone: Function,
};

export const AppContext = createContext(initialStates);

export function AppProvider({ children }) {
  const initialProfile = getPlayerProfile(localStorage);
  const [state, setState] = useState(initialStates);
  const [playerProfile, setPlayerProfileState] = useState(initialProfile);
  const playerProfileRef = useRef(initialProfile);

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

  function commitPlayerProfile(nextProfile) {
    const savedProfile = savePlayerProfile(localStorage, nextProfile);
    playerProfileRef.current = savedProfile;
    setPlayerProfileState(savedProfile);
    return savedProfile;
  }

  function refreshPlayerProfile() {
    const refreshedProfile = getPlayerProfile(localStorage);
    return commitPlayerProfile(refreshedProfile);
  }

  function rewardAnswer(options) {
    const result = applyAnswerReward(playerProfileRef.current, options);
    const savedProfile = commitPlayerProfile(result.profile);

    return {
      ...result,
      profile: savedProfile,
    };
  }

  function rewardMilestone(options) {
    const result = applyMilestoneReward(playerProfileRef.current, options);
    const savedProfile = commitPlayerProfile(result.profile);

    return {
      ...result,
      profile: savedProfile,
    };
  }

  return (
    <AppContext.Provider
      value={{
        totalPoints: playerProfile.totalXp ?? state.totalPoints,
        setTotalPoints: (totalXp) =>
          commitPlayerProfile({
            ...playerProfileRef.current,
            totalXp,
          }),
        AditionphasesList: state.AditionphasesList,
        setAditionphasesList: (AditionphasesList) =>
          updateState("AditionphasesList", AditionphasesList),
        getLocalStorageValue,
        setLocalStorageValue,
        savedPoints: playerProfile.totalXp,
        playerProfile,
        refreshPlayerProfile,
        rewardAnswer,
        rewardMilestone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
