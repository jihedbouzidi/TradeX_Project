/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import styles from "./VotrePub.module.css";
import Modal from "./Modal";
import {
  FaTrash,
  FaEdit,
  FaBullseye,
  FaArrowRight,
  FaDesktop,
  FaMobileAlt,
  FaWhatsapp,
  FaFacebook,
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
      toast.error(
        error.message || "Erreur lors du chargement des publications",
        {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        }
      );
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pubId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Supprimer cette publication ?",
      html: '<div style="color: #ff6b6b; font-weight: 500;">Cette action est irréversible !</div>',
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      backdrop: "rgba(0,0,0,0.4)",
      allowOutsideClick: false,
    });

    if (!isConfirmed) return;

    try {
      const success = await deletePublication(pubId);

      if (success) {
        await fetchPublications();
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Échec !",
        text: error.message || "Erreur lors de la suppression",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImageModal = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("closeButton")
    ) {
      setSelectedImage(null);
    }
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    let newIndex;
    if (direction === "prev") {
      newIndex =
        (currentImageIndex - 1 + existingImages.length) % existingImages.length;
    } else {
      newIndex = (currentImageIndex + 1) % existingImages.length;
    }

    setSelectedImage(existingImages[newIndex].chemin);
    setCurrentImageIndex(newIndex);
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

  const handleUpdate = async () => {
    try {
      // Prepare images data
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images[]", image);
      });
      const imagePaths = images.map((image) => {
        if (image instanceof File) {
          return image.name;
        }
        return image.split("/").pop();
      });
      // Prepare updated data
      const updatedData = {
        type_app,
        description,
        objectif,
        facebook: facebookLink,
        whatsapp: whatsappNumber,
        images_to_delete: imagesToDelete,
        new_images: imagePaths,
      };

      const success = await updatePublication(currentPub.id, updatedData);
      if (success) {
        setShowModal(false);
        fetchPublications();
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la mise à jour", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      console.error("Update error:", error);
    }
  };

  return (
    <>
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
                      <FaDesktop
                        style={{ fontSize: "30px" }}
                        className={styles.deviceIcon}
                      />
                      <span style={{ fontSize: "30px" }}>PC</span>
                    </>
                  ) : (
                    <>
                      <FaMobileAlt
                        style={{ fontSize: "30px" }}
                        className={styles.deviceIcon}
                      />
                      <span style={{ fontSize: "30px" }}>Mobile</span>
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
                  
                  {pub.whatsapp && (
                    <a
                      href={pub.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappButton}
                    >
                      <FaWhatsapp className={styles.icon} />
                      WhatsApp
                    </a>
                  )}
                  {pub.facebook && (
                    <a
                      href={pub.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.facebookButton}
                    >
                      <FaFacebook className={styles.icon} />
                      Facebook
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
        <Modal
          onClose={handleCloseModal}
          onPublish={handleUpdate}
          type_app={type_app}
          setType_app={setType_app}
          description={description}
          setDescription={setDescription}
          objectif={objectif}
          setObjectif={setObjectif}
          images={images}
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
          whatsappNumber={whatsappNumber}
          setWhatsappNumber={setWhatsappNumber}
          existingImages={existingImages}
          imagesToDelete={imagesToDelete}
          handleRemoveExistingImage={handleRemoveExistingImage}
          handleImageChange={handleImageChange}
          removeImage={removeImage}
        />
      )}
    </>
  );
};

export default VotrePub;
