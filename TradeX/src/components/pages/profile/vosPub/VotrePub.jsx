/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import styles from "./VotrePub.module.css";
import {
  FaTrash,
  FaEdit,
  FaTimes,
  FaBullseye,
  FaArrowRight,
  FaDesktop,
  FaMobileAlt,FaPlus
} from "react-icons/fa";

const VotrePub = () => {
  const { user, getUserPublications, deletePublication, updatePublication } =
    useAuth();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPub, setCurrentPub] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Form data for modal
  const [type_app, setType_app] = useState("");
  const [description, setDescription] = useState("");
  const [objectif, setObjectif] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchPublications();
    }
  }, [user]);

  const fetchPublications = async () => {
    try {
      console.log("Fetching publications for user ID:", user.id);
      setLoading(true);
      const data = await getUserPublications(user.id);
      console.log("Fetched publications:", data);
      setPublications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur fetchPublications:", error);
      toast.error(error.message || "Erreur lors du chargement des publications");
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pubId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      return;
    }

    try {
      const success = await deletePublication(pubId);
      if (success) {
        fetchPublications();
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la suppression");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (publication) => {
    setCurrentPub(publication);
    setType_app(publication.type_app);
    setDescription(publication.description);
    setObjectif(publication.objectif);
    setFacebookLink(publication.facebook || "");
    setWhatsappNumber(publication.whatsapp || "");
    setExistingImages(publication.images || []);
    setImages([]);
    setImagesToDelete([]);
    setShowModal(true);
  };

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImageModal = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("closeButton")) {
      setSelectedImage(null);
    }
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = (currentImageIndex - 1 + existingImages.length) % existingImages.length;
    } else {
      newIndex = (currentImageIndex + 1) % existingImages.length;
    }

    setSelectedImage(existingImages[newIndex].chemin);
    setCurrentImageIndex(newIndex);
  };

  const handleUpdate = async () => {
    try {
      // Prepare images data
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images[]", image);
      });

      // First upload new images if any
      let newImagePaths = [];
      if (images.length > 0) {
        const uploadResponse = await fetch(
          "http://localhost/Backend_TradeX/upload.php",
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadResult.message || "Failed to upload images");
        }
        newImagePaths = uploadResult.paths || [];
      }

      // Prepare updated data
      const updatedData = {
        type_app,
        description,
        objectif,
        facebook: facebookLink,
        whatsapp: whatsappNumber,
        images_to_delete: imagesToDelete,
        new_images: newImagePaths,
      };

      const success = await updatePublication(currentPub.id, updatedData);
      if (success) {
        setShowModal(false);
        fetchPublications();
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la mise à jour");
      console.error("Update error:", error);
    }
  };

  const handleRemoveExistingImage = (imageId) => {
    setImagesToDelete([...imagesToDelete, imageId]);
    setExistingImages(existingImages.filter((img) => img.id !== imageId));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(
      0,
      4 - (existingImages.length - imagesToDelete.length) - images.length
    );
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className={styles.title}>Vos Publications</h1>
      {loading ? (
        <div className={styles.loading}>Chargement...</div>
      ) : publications.length === 0 ? (
        <div className={styles.empty}>Aucune publication trouvée</div>
      ) : (
        <div className={styles.publicationsGrid}>
          {publications.map((pub) => (
            <div key={pub.id} className={styles.publicationCard}>
              <div className={styles.publicationHeader}>
                <div className={styles.deviceType}>
                  {pub.type_app === "pc" ? (
                    <>
                      <FaDesktop style={{fontSize:"30px"}} className={styles.deviceIcon} />
                      <span style={{fontSize:"30px"}}>PC</span>
                    </>
                  ) : (
                    <>
                      <FaMobileAlt style={{fontSize:"30px"}} className={styles.deviceIcon} />
                      <span style={{fontSize:"30px"}}>Mobile</span>
                    </>
                  )}
                </div>
                <div className={styles.publicationActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(pub)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(pub.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.publicationBody}>
                <p className={styles.publicationDesc}>{pub.description}</p>
                <hr />
                {pub.images && pub.images.length > 0 && (
                  <>
                    <div className={styles.imagesContainer}>
                      {pub.images.map((img, index) => (
                        <img
                          key={img.id}
                          src={img.chemin}
                          alt="Publication"
                          className={styles.publicationImage}
                          onClick={() => handleImageClick(img.chemin, index)}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </div>
                    <hr />
                  </>
                )}
                <div className={styles.objectifContainer}>
                  <div className={styles.objectifHeader}>
                    <FaBullseye className={styles.objectifIcon} />
                    <h3 style={{ color: "green", marginLeft: "8px" }}>
                      Mon Objectif
                    </h3>
                  </div>
                  <div className={styles.objectifContent}>
                    <FaArrowRight className={styles.arrowIcon} />
                    <p className={styles.objectifText}>{pub.objectif}</p>
                  </div>
                </div>
                <hr />
                <div className={styles.publicationContacts}>
                  {pub.facebook && (
                    <a
                      href={pub.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      Facebook
                    </a>
                  )}
                  {pub.whatsapp && (
                    <a
                      href={`https://wa.me/${pub.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.publicationFooter}>
                <small className={styles.publicationDate}>
                  Publié le:{" "}
                  {new Date(pub.date_publication).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.modalContent}>
            {existingImages.length > 1 && (
              <>
                <button
                  className={styles.navButton}
                  style={{ left: "20px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  aria-label="Image précédente"
                >
                  &lt;
                </button>
                <button
                  className={styles.navButton}
                  style={{ right: "20px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  aria-label="Image suivante"
                >
                  &gt;
                </button>
              </>
            )}

            <img
              src={selectedImage}
              className={styles.fullSizeImage}
              alt="Image en grand"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

{showModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Modifier la Publication</h2>
          <button className={styles.modalClose} onClick={() => setShowModal(false)}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Type appareil */}
          <div className={styles.formGroup}>
            <label>Type d{"'"}appareil</label>
            <select
              value={type_app}
              onChange={(e) => setType_app(e.target.value)}
              className={styles.formControl}
            >
              <option value="">Sélectionnez un type</option>
              <option value="pc">PC</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.formControl}
              rows={5}
            />
          </div>

          {/* Objectif */}
          <div className={styles.formGroup}>
            <label>Objectif</label>
            <textarea
              value={objectif}
              onChange={(e) => setObjectif(e.target.value)}
              className={styles.formControl}
              rows={3}
            />
          </div>

          {/* Contacts - organisé en ligne */}
          <div className={styles.formGroup}>
            <label>Contacts</label>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="url"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  placeholder="Lien Facebook"
                  className={styles.formControl}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Numéro WhatsApp"
                  className={styles.formControl}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={styles.formGroup}>
            <label>Images ({existingImages.length - imagesToDelete.length + images.length}/4)</label>
            <div className={styles.imageUploadContainer}>
              <label className={styles.uploadButton}>
                <FaPlus /> Ajouter des images
                <input
                style={{height:"80px",width:"80px" }}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  disabled={existingImages.length - imagesToDelete.length + images.length >= 4}
                />
              </label>
            </div>
            
            <div className={styles.imagePreviews}>
              {/* Afficher les images existantes et nouvelles */}
              {[...existingImages, ...images].map((img, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img
                    src={img.chemin || URL.createObjectURL(img)}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                  <button
                    className={styles.removeImageButton}
                    onClick={() => img.id ? handleRemoveExistingImage(img.id) : removeImage(index - existingImages.length)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={() => setShowModal(false)}>
            Annuler
          </button>
          <button className={styles.saveButton} onClick={handleUpdate}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default VotrePub;