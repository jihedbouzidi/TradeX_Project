import { useState, useEffect } from "react";
import { MdDensityMedium } from "react-icons/md";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
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
        photoURL: user.chemin_photo
        
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
      navigate("/");
    }
    
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_left}>
        <img src="logo.png" alt="TradeX Logo" className={styles.logo} />
        <h3 className={styles.brand_name}>TradeX</h3>
      </div>

      {toggle && isMobile ? (
        <MobileMenu onClose={toggled} onProfileClick={handleProfileClick} profileData={profileData} />
      ) : (
        <div className={styles.main_menu}>
          <ul>
            <li>
              <Link to="/compte" className={styles.menu_item} onClick={toggled}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.menu_item} onClick={toggled}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.menu_item} onClick={toggled}>
                À propos
              </Link>
            </li>
            {!isMobile && (
              <ProfileMenu
                onProfileClick={handleProfileClick}
                onLogoutClick={handleLogoutClick}
                profileData={profileData}
              />
            )}
          </ul>
        </div>
      )}

      <div className={styles.btns}>
        {isMobile && (
          <MdDensityMedium className={styles.toggle_btn} onClick={toggled} />
        )}
      </div>
    </div>
  );
};

export default NavBar;