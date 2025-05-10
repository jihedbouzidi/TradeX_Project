import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { LogReg } from "./components/registre/LogReg.jsx";
import NavBar from "./components/navbar/NavBar";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const { user } = useAuth();
  const handleProfileClick = () => {
    setIsProfile(!isProfile);
  };

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
              <>
                <NavBar />
                <Home />
              </>
            }
          />

          <Route path="/" element={<Layout />}>
            <Route
              path="/logreg"
              element={
                user ? (
                  <>
                    <Layout />
                  </>
                ) : (
                  <LogReg
                    isActive={isActive}
                    handleRegisterClick={handleRegisterClick}
                    handleLoginClick={handleLoginClick}
                  />
                )
              }
            />
            <Route path="/compte" element={<Home />} />
            <Route
              path="/contact"
              element={
                <>
                  <>
                    <NavBar onProfileB={handleProfileClick} />
                    <ContactForm />
                  </>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavBar onProfileB={handleProfileClick} />
                  <Profile />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <NavBar onProfileB={handleProfileClick} />
                  <About />
                </>
              }
            />
            <Route path="/panier" element={<><NavBar /><Panier /> </>} />
            <Route path="/chat" element={<CharWithAI />} />
            <Route
              path="/votrePub"
              element={
                <>
                  <NavBar />
                  <VotrePub />
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
