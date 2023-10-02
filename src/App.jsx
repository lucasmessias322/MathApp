import React from "react";
import RoutesComponet from "./RoutesComponet";
import { AppProvider } from "./Contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <RoutesComponet />
    </AppProvider>
  );
}

export default App;
