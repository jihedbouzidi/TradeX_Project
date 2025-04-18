/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import styles from "./NavBar.module.css";

const MobileMenu = ({ onClose, onProfileClick ,  profileData}) => {
  return (
    <div className={`${styles.main_menu} ${styles["main_menu--open"]}`}>
      <MdClose className={styles.close_btn} onClick={onClose} />
      <ul>
        <li
          className={styles.profile_container_mobile}
          onClick={onProfileClick}
        >
          <img
            width="85px"
            height="85px"
            src={profileData.photoURL}
            alt="Profile"
            className={styles.profile_image_mobile}
          />
        </li>
        <li>
          <Link to="/compte" className={styles.menu_item} onClick={onClose}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/contact" className={styles.menu_item} onClick={onClose}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.menu_item} onClick={onClose}>
            À propos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;