import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";
import { SocialMedia } from "./SocialMedia";
import { ProfileActions } from "./ProfileActions";
import { FaNewspaper } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
export const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const handleLogout = () => {
    const success = logout();
    if (success) {
      navigate("/");
    }
  };
  const [profileData, setProfileData] = useState({
    NomPre: "",
    Email: "",
    Telephone: "",
    location: "",
    specialite: "",
    socialMedia: {
      facebook: "",
      whatsapp: "",
      insta: "",
    },
    photoURL: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        NomPre: user.nomPre || "",
        Email: user.email || "",
        Telephone: user.telephone || "",
        location: user.localisation || "",
        specialite: user.specialite || "",
        socialMedia: {
          facebook: user.facebook || "",
          whatsapp: user.whatsapp || "",
          insta: user.instagram || "",
        },
        photoURL: user.chemin_photo
        
      });
    }
  }, [user]);

  const validateProfileData = () => {
    if (!profileData.NomPre || !profileData.Email || !profileData.Telephone) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.Email)) {
      toast.error("Veuillez entrer une adresse email valide", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Veuillez remplir tous les champs de mot de passe", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return false;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Les nouveaux mots de passe ne correspondent pas", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return false;
      }

      if (newPassword.length < 8) {
        toast.error("Le mot de passe doit contenir au moins 8 caractères", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return false;
      }
    }

    return true;
  };

  const handleSaveClick = async () => {
    if (!isEditing) {
      setIsEditing(false);
      return;
    }
  
    if (!validateProfileData()) return;
    if (!validatePassword()) return;
  
    setIsSaving(true);
  
    try {
      const formData = new FormData();
      // Ajoutez tous les champs nécessaires
      Object.keys(profileData).forEach(key => {
        if (key !== 'socialMedia' && key !== 'photoURL' && key !== 'photoFile') {
          formData.append(key, profileData[key]);
        }
      });
  
      // Ajoutez les médias sociaux
      Object.keys(profileData.socialMedia).forEach(platform => {
        formData.append(platform, profileData.socialMedia[platform]);
      });
  
      // Ajoutez le fichier photo si présent
      if (profileData.photoFile) {
        formData.append('photo_profil', profileData.photoFile);
      }
  
      // Ajoutez les mots de passe si modifiés
      if (passwordData.newPassword) {
        formData.append('old_password', passwordData.oldPassword);
        formData.append('new_password', passwordData.newPassword);
      }
  
      const success = await updateProfile(formData);
      if (success) {
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e, field) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const handleSocialMediaChange = (e, platform) => {
    setProfileData({
      ...profileData,
      socialMedia: {
        ...profileData.socialMedia,
        [platform]: e.target.value,
      },
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifiez que c'est bien une image
      if (!file.type.match('image.*')) {
        toast.error('Veuillez sélectionner une image valide');
        return;
      }
      
      // Prévisualisation instantanée
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          photoURL: event.target.result,
          photoFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublicationsClick = () => {
    navigate("/votrePub");
  };

  if (!user) {
    return (
      <div className={styles.profile_container}>
        <div className={styles.loading_container}>
          <p>Veuillez vous connecter pour accéder à votre profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile_container}>
      <Toaster position="top-center" />

      <div className={styles.top_actions}>
        <button
          className={styles.publications_button}
          onClick={handlePublicationsClick}
        >
          <FaNewspaper /> Vos Publications
        </button>
      </div>

      <div className={styles.profile_header}>
        <ProfileHeader
          photoURL={profileData.photoURL}
          isEditing={isEditing}
          onPhotoChange={handlePhotoChange}
        />
        <div className={styles.profile_info}>
          <h1 className={styles.profile_title}>Profil</h1>
          <h3 className={styles.user_name}>{profileData.NomPre}</h3>
          <ProfileInfo
            users={profileData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            handleSocialMediaChange={handleSocialMediaChange}
          />
          <SocialMedia socialMedia={profileData.socialMedia} />
        </div>
      </div>

      {isSaving ? (
        <div className={styles.saving_indicator}>
          <div className={styles.loading_spinner}></div>
          <p>Enregistrement en cours...</p>
        </div>
      ) : (
        <ProfileActions
          isEditing={isEditing}
          onEditClick={() => setIsEditing(true)}
          onSaveClick={handleSaveClick}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
