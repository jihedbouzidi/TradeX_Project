/* eslint-disable react/prop-types */
import styles from "./Home.module.css";
import { FaWhatsapp, FaFacebook, FaShoppingCart } from "react-icons/fa"; 

const Content = ({ user, description, images, date_pub, facebook, whatsapp }) => {
  return (
    <div className={styles.content}>
      <div className={styles.headerSection}>
        <div className={styles.userSection}>
          <a href={user.LinkProfile}>
            <img
              src={user.photoProURL}
              className={styles.profilePhoto}
              alt="Photo de Profile"
            />
          </a>
          <a href={user.LinkProfile} className={styles.profileLink}>
            <strong className={styles.nom}>{user.nom}</strong>
          </a>
          <br />
          <br />
          <i>{new Date(date_pub).toLocaleString()}</i>
        </div>
        <button className={styles.addToCartButton}>
          <FaShoppingCart className={styles.cartIcon} />
          Ajouter au panier
        </button>
      </div>

      <p className={styles.description}>{description}</p>
      
      {images && images.length > 0 && (
        <div className={styles.imagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={styles.publicationImage}
              alt={`Publication ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      )}

      <div className={styles.interestedSection}>
        <h3 style={{ color: "#243c5e" }}>Contact</h3>
        <div className={styles.socialButtons}>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <FaWhatsapp className={styles.icon} />
              WhatsApp
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.facebookButton}
            >
              <FaFacebook className={styles.icon} />
              Facebook
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;