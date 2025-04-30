/* eslint-disable react/prop-types */
import { FaCamera } from "react-icons/fa";
import styles from "./Profile.module.css";

export const ProfileHeader = ({ photoURL, isEditing, onPhotoChange }) => {
  return (
    <div className={styles.profile_photo_container}>
      {/* Afficher l'image uniquement si photoURL n'est pas vide */}
      {photoURL ? (
        <img
          src={photoURL} // Utiliser le chemin de l'image ou la data URL
          alt=""
          className={styles.profile_photo}
          style={{ backgroundColor: "#c9c9c9" }}
        />
      ) : (
        <p>Aucune image </p>
      )}

      {isEditing && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className={styles.photo_input}
            id="photo-input"
          />
          <label htmlFor="photo-input" className={styles.photo_input_label}>
            <FaCamera className={styles.camera_icon} />
          </label>
        </>
      )}
    </div>
  );
};
