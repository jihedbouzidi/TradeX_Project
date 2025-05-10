import { useState } from "react";
import styles from "./AddPublication.module.css";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-hot-toast";

const AddPublication = () => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [objectif, setObjectif] = useState("");
  const [type_app, setType_app] = useState("");
  const [images, setImages] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const { user, AddPublication } = useAuth();
  const navigate = useNavigate();

  const handleAddPublicationClick = () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter une publication", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePublish = async () => {
    try {
      if (!user) {
        throw new Error("Utilisateur non connecté");
      }
  
      const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";
  
      const imagePaths = images.map(image => {
        if (image instanceof File) {
          return image.name; 
        }
        return image.split('/').pop();
      });
  
      // Ajoutez un log pour vérifier les données envoyées
      console.log("Données envoyées:", {
        user: user.id,
        type_app,
        description,
        objectif,
        facebookLink,
        whatsappLink,
        imagePaths
      });
  
      const result = await AddPublication(
        user.id,
        type_app,
        description,
        objectif,
        facebookLink,
        whatsappLink,
        imagePaths
      );

      navigate(0);
      if (result && result.status === "success") {
        setDescription("");
        setObjectif("");
        setImages([]);
        setFacebookLink("");
        setWhatsappNumber("");
        setShowModal(false);
      } else {
        throw new Error(result?.message || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      toast.error(error.message || "Erreur lors de la publication", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    }
  };

  const onPanier = () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter une Favourite", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return;
    }
    else{
      navigate("/panier");
    }
    
  };

  const onChatWithAI = () => {
    navigate("/chat");
  };

  return (
    <div className={styles.addPublication}>
      <div className={styles.buttonContainer}>
        <button className={styles.cartButton} onClick={onPanier}>
          <FaShoppingCart /> Favourite
        </button>
        <button
          className={styles.addButton}
          onClick={handleAddPublicationClick}
        >
          <FaPlus /> Ajouter une Publication
        </button>
        <button className={styles.aiButton} onClick={onChatWithAI}>
          <span className={styles.aiIcon}>🤖</span>
          <span>Chat With AI</span>
        </button>
      </div>

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          onPublish={handlePublish}
          type_app={type_app}
          setType_app={setType_app}
          description={description}
          setDescription={setDescription}
          objectif={objectif}
          setObjectif={setObjectif}
          images={images}
          setImages={setImages}
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
          whatsappNumber={whatsappNumber}
          setWhatsappNumber={setWhatsappNumber}
        />
      )}
    </div>
  );
};

export default AddPublication;