/* eslint-disable react/prop-types */
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import styles from "./Profile.module.css";

export const SocialMedia = ({ socialMedia }) => {
  // Si socialMedia est undefined ou null, utiliser un objet vide
  const social = socialMedia || {};

  return (
    <div className={styles.social_media_section}>
      <h4>Réseaux Sociaux</h4>
      <div className={styles.social_icons}>
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className={styles.social_icon} />
          </a>
        )}
        {social.whatsapp && (
          <a href={social.whatsapp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className={styles.social_icon} />
          </a>
        )}
        {social.insta && (
          <a href={social.insta} target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.social_icon} />
          </a>
        )}
      </div>
    </div>
  );
};