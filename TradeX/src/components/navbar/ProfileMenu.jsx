/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./NavBar.module.css";

const ProfileMenu = ({ onProfileClick, onLogoutClick, profileData }) => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  return (
    <div
      className={styles.profile_container}
      onMouseEnter={() => setShowProfileOptions(true)}
      onMouseLeave={() => setShowProfileOptions(false)}
    >
      {profileData?.photoURL && (
        <img
          width="40px"
          height="40px"
          src={profileData.photoURL}
          alt="Profile"
          className={styles.profile_image}
        />
      )}
      {showProfileOptions && (
        <div className={styles.profile_options}>
          <button className={styles.profile_button} onClick={onProfileClick}>
            Profil
          </button>
          <button className={styles.profile_button} onClick={onLogoutClick}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
