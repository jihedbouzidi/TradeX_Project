
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
  const [images, setImages] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
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

      await AddPulication(
        user.id,
        "default",
        "Publication",
        description,
        facebookLink,
        whatsappLink
      );

      // Réinitialiser le formulaire
      setDescription("");
      setImages([]);
      setFacebookLink("");
      setWhatsappLink("");
      setShowModal(false);
    } catch (error) {
      // L'erreur est déjà gérée dans AddPulication
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
          description={description}
          setDescription={setDescription}
          images={images}
          setImages={setImages}
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
          whatsappLink={whatsappLink}
          setWhatsappLink={setWhatsappLink}
        />
      )}
    </div>
  );
};

export default AddPublication;
