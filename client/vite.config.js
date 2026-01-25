import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://flock-guard.vercel.app/",
      dynamicRoutes: [
        "/",
        "/about",
        "/contact-us",
        "/privacy-policy",
        "/terms-of-service",
      ],
    }),
  ]
});
