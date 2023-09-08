import React from "react";
import { Routes, BrowserRouter, Route, HashRouter } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import TaboadaCompleta from "./Pages/TabuadaCompleta";
import TabuadaGame from "./Pages/TabuadaGame";

export default function RoutesComponet() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<DashBoard />} />
        <Route exact path="/TabuadaGame/:tabuada" element={<TabuadaGame />} />
        <Route
          exact
          path="/TaboadaCompleta/:tabuada"
          element={<TaboadaCompleta />}
        />
      </Routes>
    </HashRouter>
  );
}
