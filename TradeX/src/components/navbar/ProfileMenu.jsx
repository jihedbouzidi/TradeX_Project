/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./NavBar.module.css";

const ProfileMenu = ({ onProfileClick, onLogoutClick, profileData, onProfileBtn }) => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleMouseLeave = () => {
    setClosing(true);
    setTimeout(() => {
      if (closing) {
        setShowProfileOptions(false);
        setClosing(false);
      }
    }, 300); // Délai de 300ms pour permettre le clic
  };

  const handleButtonClick = (handler) => {
    setClosing(false);
    setShowProfileOptions(false);
    handler();
  };

  return (
    <div
      className={styles.profile_container}
      onMouseEnter={() => setShowProfileOptions(true)}
      onMouseLeave={handleMouseLeave}
    >
      {profileData?.photoURL && !onProfileBtn && (
        <img
          width="50px"
          height="50px"
          src={profileData.photoURL}
          alt="Profile"
          className={styles.profile_image}
        />
      )}
      {showProfileOptions && (
        <div className={styles.profile_options}>
          <button 
            className={styles.profile_button} 
            onClick={() => handleButtonClick(onProfileClick)}
          >
            Profil
          </button>
          <button 
            className={styles.profile_button} 
            onClick={() => handleButtonClick(onLogoutClick)}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileMenu;