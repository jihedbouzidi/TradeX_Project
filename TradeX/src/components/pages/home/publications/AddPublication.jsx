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
  const [type_app, setType_app] = useState("");
  const [images, setImages] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const { user, AddPulication } = useAuth();
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

      // Extraire les noms des fichiers avec leurs extensions
      const imagePaths = images.map(image => {
        if (image instanceof File) {
          return image.name; // Retourne le nom du fichier avec extension
        }
        // Si c'est déjà un chemin, retourne seulement le nom du fichier
        return image.split('/').pop();
      });

      await AddPulication(
        user.id,
        type_app,
        description,
        facebookLink,
        whatsappLink,
        imagePaths
      );

      setDescription("");
      setImages([]);
      setFacebookLink("");
      setWhatsappNumber("");
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onPanier = () => {
    navigate("/panier");
  };

  const onChatWithAI = () => {
    navigate("/chat");
  };

  return (
    <div className={styles.addPublication}>
      <div className={styles.buttonContainer}>
        <button className={styles.cartButton} onClick={onPanier}>
          <FaShoppingCart /> Panier
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