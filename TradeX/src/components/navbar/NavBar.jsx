/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MdDensityMedium } from "react-icons/md";
import {  FaSignInAlt  } from "react-icons/fa";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const NavBar = ({ onProfileB }) => {
  const { user, logout } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        photoURL: user.chemin_photo,
      });
    }
  }, [user]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggled = () => {
    setToggle((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setToggle(false);
  };

  const handleLogoutClick = () => {
    const success = logout();
    if (success) {
      navigate("/logreg");
      
    }
  };
  const handleSeConnect = () => {
    const success = logout();
    if (success) {
      navigate("/compte");
      toast.success("Déconnexion réussie!", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_left}>
        <img src="logo.png" alt="TradeX Logo" className={styles.logo} />
        <h3 className={styles.brand_name}>TradeX</h3>
      </div>

      {toggle && isMobile ? (
        <MobileMenu
          onClose={toggled}
          onProfileClick={handleProfileClick}
          profileData={profileData}
        />
      ) : (
        // {`${styles.main_menu} ${isSticky ? styles.main_menut : ''}`}
        <div className={`${styles.main_menu} ${!user ? styles.main_menut : ''}`}>
          <ul>
            <li>
              <Link to="/compte" className={styles.menu_item} onClick={toggled}>
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={styles.menu_item}
                onClick={toggled}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.menu_item} onClick={toggled}>
                À propos
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!isMobile &&
        (user ? (
          <ProfileMenu
            onProfileBtn={onProfileB}
            onProfileClick={handleProfileClick}
            onLogoutClick={handleSeConnect}
            profileData={profileData}
          />
        ) : (
          <div>
            <button className={styles.btnSecon} onClick={handleLogoutClick}><FaSignInAlt /> Se Connecter</button>
          </div>
        ))}
      <div className={styles.btns}>
        {isMobile && (
          <MdDensityMedium className={styles.toggle_btn} onClick={toggled} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
