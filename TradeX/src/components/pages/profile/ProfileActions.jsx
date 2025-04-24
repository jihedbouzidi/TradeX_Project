/* eslint-disable react/prop-types */
import styles from "./Profile.module.css";

export const ProfileActions = ({
  isEditing,
  onEditClick,
  onSaveClick,
  onLogout,
  onCancel,
}) => {
  return (
    <div className={styles.profile_actions}>
      {isEditing ? (
        <>
          <button className={styles.edit_profile_btn} onClick={onSaveClick}>
            Enregistrer
          </button>
          <button className={styles.edit_profile_btn} onClick={onCancel}>
            Annuler
          </button>
        </>
      ) : (
        <button className={styles.edit_profile_btn} onClick={onEditClick}>
          Modifier le Profil
        </button>
      )}
      <button className={styles.logout_btn} onClick={onLogout}>
        Déconnexion
      </button>
    </div>
  );
};
