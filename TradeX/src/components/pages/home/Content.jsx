/* eslint-disable react/prop-types */
import styles from "./Home.module.css";
import { FaWhatsapp, FaFacebook, FaShoppingCart } from "react-icons/fa"; 

const Content = ({ user, description, image }) => {
  return (
    <div className={styles.content}>
      <div className={styles.headerSection}>
        <div className={styles.userSection}>
          <a href={user.LinkProfile}>
            <img
              src={user.photoProURL}
              className={styles.profilePhoto}
              alt="Photo de Profile"
              style={{ borderRadius: "50%", border: "1px solid black" }}
            />
          </a>
          <a href={user.LinkProfile} className={styles.profileLink}>
            <strong className={styles.nom}>{user.nom}</strong>
          </a>
        </div>
        <button className={styles.addToCartButton}>
          <FaShoppingCart className={styles.cartIcon} />
          Ajouter au panier
        </button>
      </div>

      <p className={styles.description}>{description}</p>
      <img src={image} className={styles.publicationImage} alt="Publication" />

      <div className={styles.interestedSection}>
        <h3 style={{ color: "#243c5e" }}>Contact</h3>
        <div className={styles.socialButtons}>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            <FaWhatsapp className={styles.icon} />
            WhatsApp
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.facebookButton}
          >
            <FaFacebook className={styles.icon} />
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Content;