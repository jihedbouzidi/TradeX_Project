/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./AddPublication.module.css";
import { FaUpload, FaFacebook, FaWhatsapp } from "react-icons/fa";
import CharacteristicsForm from "./CharacteristicsForm";

const Modal = ({
  onClose,
  onPublish,
  description,
  setDescription,
  images,
  setImages,
  facebookLink,
  setFacebookLink,
  whatsappLink,
  setWhatsappLink,
}) => {
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  useEffect(() => {
    if (showCharacteristics && selectedCharacteristics) {
      const deviceType = selectedOption === "PC" ? "PC" : "Mobile";
      setDescription(`Type d'appareil : ${deviceType}\n${selectedCharacteristics}`);
    }
  }, [selectedCharacteristics, showCharacteristics, setDescription, selectedOption]);

  const handlePublishWithCharacteristics = () => {
    if (showCharacteristics && selectedCharacteristics) {
      setDescription(`Type d'appareil : ${selectedOption === "PC" ? "PC" : "Mobile"}\n${selectedCharacteristics}`);
    }
    onPublish();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Ajouter une Publication</h2>
        <textarea
          placeholder="Description de la publication"
          className={styles.modalTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ height: "150px" }}
          required
        />
        <label className={styles.fileUpload}>
          <FaUpload className={styles.uploadIcon} />
          <span>Choisir des images</span>
          <input
            type="file"
            accept="image/*"
            className={styles.hiddenFileInput}
            onChange={handleImageChange}
            multiple
          />
        </label>
        <br />

        {images.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={image} alt={`Selected ${index}`} className={styles.previewImage} />
                <button onClick={() => removeImage(index)} className={styles.removeImageButton}>
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.socialLinks}>
          <div className={styles.socialLinkInput}>
            <FaFacebook className={styles.socialIcon} />
            <input
              type="text"
              placeholder="Lien Facebook"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              className={styles.socialInput}
              required
            />
          </div>
          <div className={styles.socialLinkInput}>
            <FaWhatsapp className={styles.socialIcon} />
            <input
              type="text"
              placeholder="Lien WhatsApp"
              value={whatsappLink}
              onChange={(e) => setWhatsappLink(e.target.value)}
              className={styles.socialInput}
              required
            />
          </div>
        </div>
        <br />
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={showCharacteristics}
            onChange={() => setShowCharacteristics(!showCharacteristics)}
          />
          <span className={styles.slider}></span>
          Ajouter des Caractéristiques
        </label>

        {showCharacteristics && (
          <CharacteristicsForm
            setSelectedCharacteristics={setSelectedCharacteristics}
            setSelectedOption={setSelectedOption}
          />
        )}

        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Annuler
          </button>
          <button onClick={handlePublishWithCharacteristics} className={styles.publishButton}>
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;