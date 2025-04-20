import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/registre/Login.jsx";
import Register from "./components/registre/Register.jsx";
import ToggleBox from "./components/registre/ToggleBox.jsx";
import { useState } from "react";
import "./index.css";
import { Home } from "./components/pages/home/Home";
import { ContactForm } from "./components/pages/contact/ContactForm";
import Layout from "./Layout";
import Profile from "./components/pages/profile/Profile";
import { About } from "./components/pages/About.jsx";
import Panier from "./components/pages/home/publications/panier/Panier.jsx";
import CharWithAI from "./components/pages/home/publications/ChatWithAI/ChatWithAI.jsx";
import VotrePub from "./components/pages/profile/vosPub/VotrePub.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useAuth();

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Routes sans Layout (NavBar masquée) */}
          <Route
            path="/"
            element={
              user ? (
                <Layout />
              ) : (
                <div className={`container ${isActive ? "active" : ""}`}>
                  <Login />
                  <Register />
                  <ToggleBox
                    onRegisterClick={handleRegisterClick}
                    onLoginClick={handleLoginClick}
                  />
                </div>
              )
            }
          />

          <Route path="/" element={<Layout />}>
            <Route path="/compte" element={<Home />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/chat" element={<CharWithAI />} />
            <Route path="/votrePub" element={<VotrePub />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
