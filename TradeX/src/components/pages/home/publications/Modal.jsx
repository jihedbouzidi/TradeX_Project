/* eslint-disable react/prop-types */
import styles from "./AddPublication.module.css";
import { FaUpload, FaFacebook, FaWhatsapp, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Modal = ({
  onClose,
  onPublish,
  type_app,
  setType_app,
  description,
  setDescription,
  images,
  setImages,
  facebookLink,
  setFacebookLink,
  whatsappNumber,
  setWhatsappNumber,
}) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePublishWithCharacteristics = async () => {
    try {
      if (!description.trim()) {
        toast.error("Veuillez ajouter une description", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return;
      }

      await onPublish();

      toast.success("Publication ajoutée avec succès!", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.message || "Erreur lors de la publication", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Nouvelle Publication</h2>
            <button className={styles.modalClose} onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalBody}>
            <textarea
              className={styles.modalDesc}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre publication..."
              rows={5}
            />
            <select
              value={type_app}
              onChange={(e) => setType_app(e.target.value)}
              name="SelectTypeAppareil"
              className={styles.select}
            >
              <option value="toutes">Toutes</option>
              <option value="pc">Pc</option>
              <option value="mobile">Mobile</option>
            </select>

            <div className={styles.fileUploadContainer}>
              <label className={styles.fileUpload}>
                <FaUpload className={styles.uploadIcon} />
                <span>Ajouter des images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.hiddenFileInput}
                />
              </label>
              <p className={styles.fileUploadHint}>(Maximum 4 images)</p>
            </div>

            {images.length > 0 && (
              <div className={styles.imageGrid}>
                {images.map((image, index) => (
                  <div key={index} className={styles.imageGridItem}>
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      className={styles.removeImageButton}
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
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
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  placeholder="Lien Facebook"
                  className={styles.socialInput}
                />
              </div>
              <div className={styles.socialLinkInput}>
                <FaWhatsapp className={styles.socialIcon} />
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Numéro WhatsApp"
                  className={styles.socialInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Annuler
            </button>
            <button
              className={styles.publishButton}
              onClick={handlePublishWithCharacteristics}
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
