/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./AddPublication.module.css";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const AddPublication = ({ onPublish }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  const handleAddPublicationClick = () => {
    setShowModal(true);
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePublish = () => {
    const newPublication = {
      description: description,
      image: images[0],
      facebookLink: facebookLink,
      whatsappLink: whatsappLink,
    };

    onPublish(newPublication);

    setDescription("");
    setImages([]);
    setFacebookLink("");
    setWhatsappLink("");
    setShowModal(false);
  };

  const navigate = useNavigate();
  const onPanier = () => {
    navigate("/panier");
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