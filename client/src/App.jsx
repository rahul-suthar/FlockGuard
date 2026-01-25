import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage.jsx";

const Onboarding = lazy(() => import("./pages/Onboarding"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col cursor-default font-mono">
      <NavBar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="flex h-[70dvh] items-center justify-center text-red-500 font-bold">
                Loading...
              </div>
            }
          >
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
              <Route
                path="*"
                element={
                  <AnimatedPage>
                    <NotFound />
                  </AnimatedPage>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
