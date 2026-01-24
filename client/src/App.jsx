import { Routes, Route, useLocation } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import NavBar from "./components/NavBar.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage.jsx";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col cursor-default font-mono">
      <NavBar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Onboarding />
                </AnimatedPage>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedPage>
                  <About />
                </AnimatedPage>
              }
            />
            <Route
              path="/contact-us"
              element={
                <AnimatedPage>
                  <Contact />
                </AnimatedPage>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <AnimatedPage>
                  <Privacy />
                </AnimatedPage>
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <AnimatedPage>
                  <Terms />
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
