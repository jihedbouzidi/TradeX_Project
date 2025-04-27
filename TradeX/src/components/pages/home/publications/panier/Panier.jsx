import { useState, useEffect } from "react";
import styles from "./../panier/Panier.module.css";
import { useAuth } from "../../../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { FaTrash, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Panier = () => {
  const { user } = useAuth();
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPanier = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `http://localhost/Backend_TradeX/getPanier.php?utilisateur_id=${user.id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message ||
              `Erreur ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        setPanier(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching panier:", error);
        setError(error.message);
        toast.error(`Erreur: ${error.message}`, {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [user]);

  const removeFromPanier = async (publication_id) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/SuppPubPanier.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            utilisateur_id: user.id,
            publication_id: publication_id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      setPanier(panier.filter((item) => item.id !== publication_id));
      toast.success("Publication supprimée du panier!", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
    }
  };

  if (loading) return <div className={styles.accountPage}>Chargement...</div>;
  if (!user)
    return (
      <div className={styles.accountPage}>
        Veuillez vous connecter pour voir votre panier
      </div>
    );
  if (error) return <div className={styles.accountPage}>Erreur: {error}</div>;

  return (
    <div className={styles.accountPage}>
      <div className={styles.mainContent}>
        {panier.length === 0 ? (
          <div className={styles.emptyCart}>Votre panier est vide</div>
        ) : (
          panier.map((item) => (
            <div key={item.id} className={styles.content}>
              <div className={styles.headerSection}>
                <div className={styles.userSection}>
                  <img
                    src={item.photoProURL}
                    className={styles.profilePhoto}
                    alt="Photo de Profile"
                  />
                  <div>
                    <strong className={styles.nom}>{item.nom} </strong> <br />
                    <i>{item.date_publication}</i>
                  </div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => removeFromPanier(item.id)}
                >
                  <FaTrash className={styles.trashIcon} />
                  Supprimer
                </button>
              </div>

              <p className={styles.description}>{item.description}</p>

              <div className={styles.imagesContainer}>
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.chemin}
                    className={styles.publicationImage}
                    alt={`Publication ${index + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>

              <div className={styles.objectifContainer}>
                <div className={styles.objectifHeader}>
                  <h3 style={{ color: "green" }}>Mon Objectif</h3>
                </div>
                <p className={styles.objectifText}>{item.objectif}</p>
              </div>
              <div className={styles.interestedSection}>
                <h3 style={{ color: "#243c5e" }}>Contact</h3>
                <div className={styles.socialButtons}>
                  {item.whatsapp && (
                    <a
                      href={item.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappButton}
                    >
                      <FaWhatsapp className={styles.icon} />
                      WhatsApp
                    </a>
                  )}

                  {item.facebook && (
                    <a
                      href={item.facebook}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Panier;
