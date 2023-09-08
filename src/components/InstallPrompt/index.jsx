import React, { useEffect, useState } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("O usuário aceitou a instalação");
        } else {
          console.log("O usuário recusou a instalação");
        }
      });
    }
  };

  return <button onClick={installPWA}>Instalar o App</button>;
}

export default InstallPrompt;
