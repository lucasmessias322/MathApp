import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "autoUpdate",
  manifest: {
    short_name: "MathGame",
    includeAssets: [
      "favicon.ico",
      "logo192.png",
      "logo512.png",
      "./assets/nivelbarprogress.png",
      "./assets/termometerbg.png",
      "./soundeffects/happy-pop-2-185287.mp3",
      "./soundeffects/mixkit-wrong-electricity-buzz-955.wav",
      "./soundeffects/rightanswer.mp3",
    ],
    name: "MathGame",
    desciption:
      "an application that helps people learn taboda and practice mathematics",
    icons: [
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "./",
    scope: "/",
    lang: "pt-br",
    display: "standalone",
    theme_color: "#19191F",
    background_color: "#19191F",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
