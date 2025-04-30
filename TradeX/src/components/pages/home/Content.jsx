/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../../hooks/useAuth";
import {
  FaWhatsapp,
  FaFacebook,
  FaShoppingCart,
  FaBullseye,
  FaArrowRight,
  FaDesktop,
  FaMobileAlt,
} from "react-icons/fa";

const Content = ({
  user,
  idPublication,
  description,
  objectif,
  images,
  type,
  date_pub,
  facebook,
  whatsapp,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToPanier  } = useAuth();

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeModal = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("closeButton")
    ) {
      setSelectedImage(null);
    }
  };

  const navigateImage = (direction) => {
    if (!images || images.length === 0) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentImageIndex + 1) % images.length;
    }

    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
  };

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
            <br />
            <i>{new Date(date_pub).toLocaleString()}</i>
          </a>
        </div>
        <button
          className={styles.addToCartButton}
          onClick={() => addToPanier(idPublication)} 
        >
          <FaShoppingCart className={styles.cartIcon} />
          Ajouter au favourite
        </button>
      </div>

      <div className={styles.deviceType}>
        {type === "pc" ? (
          <FaDesktop className={styles.deviceIcon} title="Ordinateur" />
        ) : (
          <FaMobileAlt className={styles.deviceIcon} title="Mobile" />
        )}
      </div>
      <br />
      <p className={styles.description}>{description}</p>
      
      
      <br />

      {images && images.length > 0 && (
        <>
        <hr />
        <div className={styles.imagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={styles.publicationImage}
              alt={`Publication ${index + 1}`}
              loading="lazy"
              onClick={() => handleImageClick(image, index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div></>
        
      )}
      <hr />
      <div className={styles.objectifContainer}>
        <div className={styles.objectifHeader}>
          <FaBullseye className={styles.objectifIcon} />
          <h3 style={{ color: "green", marginLeft: "8px" }}>Mon Objectif</h3>
        </div>
        <div className={styles.objectifContent}>
          <FaArrowRight className={styles.arrowIcon} />
          <p className={styles.objectifText}>{objectif}</p>
        </div>
      </div>
      {selectedImage && (
        <div className={styles.imageModal} onClick={closeModal}>
          <div className={styles.modalContent}>
            {images.length > 1 && (
              <>
                <button
                  className={styles.navButton}
                  style={{ left: "20px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  aria-label="Image précédente"
                >
                  &lt;
                </button>
                <button
                  className={styles.navButton}
                  style={{ right: "20px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  aria-label="Image suivante"
                >
                  &gt;
                </button>
              </>
            )}

            <img
              src={selectedImage}
              className={styles.fullSizeImage}
              alt="Image en grand"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
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
