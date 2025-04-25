/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Filtrage from "./Filtrage";
import AddPublication from "./publications/AddPublication";
import Content from "./Content";
import styles from "./Home.module.css";
import { api } from "../../../services/api";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "toutes",
    pcOptions: {},
    mobileOptions: {},

});

const fetchPublications = async () => {
  setLoading(true);
  setError(null);
  try {
    // Construire les paramètres de requête
    const params = {};
    
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.type !== "toutes") {
      params.type = filters.type;
    }

    // Options PC
    if (filters.type === "pc") {
      if (filters.pcOptions.disqueDurType) {
        params.disqueDurType = filters.pcOptions.disqueDurType;
      }
      if (filters.pcOptions.disqueDurCapacite) {
        params.disqueDurCapacite = filters.pcOptions.disqueDurCapacite;
      }
      if (filters.pcOptions.ramValue) {
        params.ram = filters.pcOptions.ramValue;
      }
      if (filters.pcOptions.carteGraphiqueValue) {
        params.carteGraphique = filters.pcOptions.carteGraphiqueValue;
      }
      if (filters.pcOptions.processeurValue) {
        params.processeur = filters.pcOptions.processeurValue;
      }
    }

    // Options Mobile
    if (filters.type === "mobile") {
      if (filters.mobileOptions.cameraValue) {
        params.camera = filters.mobileOptions.cameraValue;
      }
      if (filters.mobileOptions.stockageValue) {
        params.stockage = filters.mobileOptions.stockageValue;
      }
      if (filters.mobileOptions.ramValue) {
        params.ram = filters.mobileOptions.ramValue;
      }
      if (filters.mobileOptions.batterieValue) {
        params.batterie = filters.mobileOptions.batterieValue;
      }
    }

    const response = await api.get("/AffPublication.php", params);
    
    if (response && response.publications) {
      setPosts(
        response.publications.map((pub) => ({
          id: pub.id,
          user: pub.user,
          description: pub.description,
          images: pub.images,
          date_pub: pub.date_pub,
          facebook: pub.facebookLink,
          whatsapp: pub.whatsappLink,
        }))
      );
    } else {
      setPosts([]);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
    setError(
      error.message ||
      "Erreur de connexion au serveur. Veuillez vérifier que le serveur est en cours d'exécution."
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchPublications();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  

  return (
    <div className={styles.accountPage}>
      <div className={styles.filterContainer}>
      <Filtrage onFilterChange={handleFilterChange} />
    </div>
      
      <div className={styles.mainContent}>
        <AddPublication />

        {loading && (
          <div className={styles.loading}>Chargement en cours...</div>
        )}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && (
          <>
          
            {posts.length === 0 ? (
              <div className={styles.noResults}>Aucune publication trouvée</div>
            ) : (
              posts
                .sort((a, b) => new Date(b.date_pub) - new Date(a.date_pub))
                .map((post) => (
                  <Content
                    key={post.id}
                    user={post.user}
                    description={post.description}
                    images={post.images}
                    date_pub={post.date_pub}
                    facebook={post.facebook}
                    whatsapp={post.whatsapp}
                  />
                ))
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Home;