/* eslint-disable react/prop-types */
import styles from "./Profile.module.css";
import { useState } from "react";

export const ProfileInfo = ({
  user = {},
  isEditing,
  handleInputChange,
  passwordData = {},
  setPasswordData,
  handleSocialMediaChange,
}) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handlePasswordFieldChange = (e, field) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value,
    });
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className={styles.profile_details}>
        <p>Chargement des informations...</p>
      </div>
    );
  }

  // Filter out non-serializable properties
  const displayableUser = {
    ...user,
    socialMedia: user.socialMedia || {},
  };
  delete displayableUser.photoFile; // Remove the File object

  const renderEditingForm = () => (
    <form>
      <div className={styles.form_group}>
        <label>Nom Complet</label>
        <input
          type="text"
          value={user?.NomPre || ""}
          onChange={(e) => handleInputChange(e, "NomPre")}
          className={styles.form_input}
          required
        />
      </div>

      {Object.entries(displayableUser).map(([key, value]) => {
        if (
          key === "photoURL" ||
          key === "socialMedia" ||
          key === "NomPre" ||
          key === "Description" ||
          key === "MotDePasse"
        )
          return null;

        const labels = {
          Email: "Email",
          Telephone: "Téléphone",
          location: "Localisation",
          specialite: "Spécialité",
        };

        return (
          <div key={key} className={styles.form_group}>
            <label>{labels[key] || key}</label>
            <input
              type={key === "Email" ? "email" : "text"}
              value={value || ""}
              onChange={(e) => handleInputChange(e, key)}
              className={styles.form_input}
              required={key === "Email" || key === "Telephone"}
            />
          </div>
        );
      })}

      <div className={styles.form_group}>
        <button
          type="button"
          onClick={togglePasswordFields}
          className={styles.change_password_button}
        >
          {showPasswordFields ? "Masquer" : "Modifier Mot de passe"}
        </button>
      </div>

      {showPasswordFields && (
        <>
          <div className={styles.form_group}>
            <label>Ancien Mot de passe</label>
            <input
              type="password"
              value={passwordData?.oldPassword || ""}
              onChange={(e) => handlePasswordFieldChange(e, "oldPassword")}
              className={styles.form_input}
            />
          </div>
          <div className={styles.form_group}>
            <label>Nouveau Mot de passe</label>
            <input
              type="password"
              value={passwordData?.newPassword || ""}
              onChange={(e) => handlePasswordFieldChange(e, "newPassword")}
              className={styles.form_input}
            />
          </div>
          <div className={styles.form_group}>
            <label>Confirmer Mot de passe</label>
            <input
              type="password"
              value={passwordData?.confirmPassword || ""}
              onChange={(e) => handlePasswordFieldChange(e, "confirmPassword")}
              className={styles.form_input}
            />
          </div>
        </>
      )}

      <div className={styles.form_group}>
        <label>Facebook</label>
        <input
          type="url"
          value={user?.socialMedia?.facebook || ""}
          onChange={(e) => handleSocialMediaChange(e, "facebook")}
          className={styles.form_input}
        />
      </div>

      <div className={styles.form_group}>
        <label>WhatsApp</label>
        <input
          type="url"
          value={user?.socialMedia?.whatsapp || ""}
          onChange={(e) => handleSocialMediaChange(e, "whatsapp")}
          className={styles.form_input}
        />
      </div>
      <div className={styles.form_group}>
        <label>Instagram</label>
        <input
          type="url"
          value={user?.socialMedia?.insta || ""}
          onChange={(e) => handleSocialMediaChange(e, "insta")}
          className={styles.form_input}
        />
      </div>
    </form>
  );

  const renderViewMode = () => (
    <table className={styles.info_table}>
      <tbody>
        <tr>
          <td className={styles.info_label}>Nom Complet</td>
          <td className={styles.info_value}>
            : {user?.NomPre || "Non spécifié"}
          </td>
        </tr>

        {Object.entries(displayableUser).map(([key, value]) => {
          if (
            key === "photoURL" ||
            key === "socialMedia" ||
            key === "NomPre" ||
            key === "Description" ||
            key === "MotDePasse"
          )
            return null;

          const labels = {
            Email: "Email",
            Telephone: "Téléphone",
            location: "Localisation",
            specialite: "Spécialité",
          };

          return (
            <tr key={key}>
              <td className={styles.info_label}>{labels[key] || key}</td>
              <td className={styles.info_value}>: {value || "Non spécifié"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className={styles.profile_details}>
      {isEditing ? renderEditingForm() : renderViewMode()}
    </div>
  );
};