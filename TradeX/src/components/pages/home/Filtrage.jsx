/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./Filtrage.module.css";

const Filtrage = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    objectif: '',
    type: 'toutes',
  });

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  const handleObjectifChange = (e) => {
    setFilters(prev => ({ ...prev, objectif: e.target.value }));
  };

  const handleSearchClick = () => {
    const newFilters = { 
      ...filters,
      // pcOptions: filters.type === 'pc' ? filters.pcOptions : {},
      // mobileOptions: filters.type === 'mobile' ? filters.mobileOptions : {}
    };
    onFilterChange(newFilters);
  };
  const handleObjectifClick = () => {
    const newFilters = { 
      ...filters,
      // pcOptions: filters.type === 'pc' ? filters.pcOptions : {},
      // mobileOptions: filters.type === 'mobile' ? filters.mobileOptions : {}
    };
    onFilterChange(newFilters);
  };

  const handleOptionChange = (event) => {
    const newFilters = { 
      ...filters, 
      type: event.target.value,
      pcOptions: {},
      mobileOptions: {}
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  
  

  return (
    <div className={`${styles.filterSection} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.filterColumn}>
        <h2>Recherche</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher..."
            className={styles.searchInput}
            value={filters.search}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
          />
          <button 
            className={styles.searchButton}
            onClick={handleSearchClick}
            disabled={!filters.search}
          >
            Rechercher
          </button>
        </div>
      </div>
      <div className={styles.filterColumn}>
        <h2>Objectif</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher..."
            className={styles.searchInput}
            value={filters.objectif}
            onChange={handleObjectifChange}
            onKeyPress={(e) => e.key === 'Enter' && handleObjectifClick()}
          />
          <button 
            className={styles.searchButton}
            onClick={handleObjectifClick}
            disabled={!filters.objectif}
          >
            Rechercher objectif
          </button>
        </div>
      </div>

      <div className={styles.filterColumn}>
        <h2>Type d{"'"}appareil</h2>
        <select
          value={filters.type}
          onChange={handleOptionChange}
          className={styles.select}
        >
          <option value="toutes">Toutes</option>
          <option value="pc">PC</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      
    </div>
  );
};

export default Filtrage;