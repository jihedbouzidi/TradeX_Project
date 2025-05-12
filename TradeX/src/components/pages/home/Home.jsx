/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Filtrage from "./Filtrage";
import AddPublication from "./publications/AddPublication";
import Content from "./Content";
import styles from "./Home.module.css";
import { api } from "../../../services/api";
import Layout from "../../../Layout";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    objectif: "",
    type: "toutes",
  });

  const fetchPublications = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      
      if (filters.search) {
        params.search = filters.search;
      }
      if (filters.objectif) {
        params.objectif = filters.objectif;
      }
      if (filters.type !== "toutes") {
        params.type = filters.type;
      }

      const response = await api.get("/Controllers/AffPublication.php", params);
      
      if (response && response.publications) {
        setPosts(
          response.publications.map((pub) => ({
            id: pub.id,
            user: pub.user,
            description: pub.description,
            objectif: pub.objectif,
            images: pub.images,
            type: pub.type, 
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
      <Layout />
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
              <div className={styles.noResults}>
              <div className={styles.noResultsContent}>
                <svg 
                  className={styles.noResultsIcon}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>Aucune publication trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
                
              </div>
            </div>
            ) : (
              posts
                .sort((a, b) => new Date(b.date_pub) - new Date(a.date_pub))
                .map((post) => (
                  <Content
                    key={post.id}
                    user={post.user}
                    idPublication={post.id}
                    description={post.description}
                    objectif={post.objectif}
                    images={post.images}
                    type={post.type}
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