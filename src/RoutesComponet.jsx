import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import TabuadaLevels from "./Pages/TabuadaLevels";
import TaboadaCompleta from "./Pages/TabuadaCompleta";
import TabuadaGame from "./Pages/TabuadaGame";
import AditionGame from "./Pages/AditionGame";

export default function RoutesComponet() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<DashBoard />} />
        <Route exact path="/tabuadalevels" element={<TabuadaLevels />} />
        <Route exact path="/TabuadaGame/:tabuada" element={<TabuadaGame />} />
        <Route
          exact
          path="/TaboadaCompleta/:tabuada"
          element={<TaboadaCompleta />}
        />
        <Route exact path="/aditionGame" element={<AditionGame />} />
      </Routes>
    </HashRouter>
  );
}
