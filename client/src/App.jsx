import { Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import NavBar from "./components/NavBar.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="h-screen flex flex-col px-2 font-mono">
      <NavBar />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
