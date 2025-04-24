/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Filtrage.module.css";
import PcOptions from "./PcOptions";
import MobileOptions from "./MobileOptions";

const Filtrage = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'toutes',
    pcOptions: {},
    mobileOptions: {}
  });

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleSearchClick = () => {
    const newFilters = { 
      ...filters,
      pcOptions: filters.type === 'pc' ? filters.pcOptions : {},
      mobileOptions: filters.type === 'mobile' ? filters.mobileOptions : {}
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

  const handlePcOptionChange = (options) => {
    const newFilters = { ...filters, pcOptions: options };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleMobileOptionChange = (options) => {
    const newFilters = { ...filters, mobileOptions: options };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.filterSection}>
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
          <br /> <br />
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

      {filters.type === "pc" && (
        <PcOptions
          pcOptions={filters.pcOptions}
          onPcOptionChange={handlePcOptionChange}
        />
      )}

      {filters.type === "mobile" && (
        <MobileOptions
          mobileOptions={filters.mobileOptions}
          onMobileOptionChange={handleMobileOptionChange}
        />
      )}
    </div>
  );
};

export default Filtrage;