import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Filtrage.module.css";
import PcOptions from "./PcOptions";
import MobileOptions from "./MobileOptions";

const Filtrage = () => {
  const [selectedOption, setSelectedOption] = useState("toutes");
  const [pcOptions, setPcOptions] = useState({
    disqueDur: false,
    ram: false,
    carteGraphique: false,
    processeur: false,
  });
  const [mobileOptions, setMobileOptions] = useState({
    camera: false,
    stockage: false,
    ram: false,
    batterie: false,
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePcOptionChange = (option) => {
    setPcOptions({ ...pcOptions, [option]: !pcOptions[option] });
  };

  const handleMobileOptionChange = (option) => {
    setMobileOptions({ ...mobileOptions, [option]: !mobileOptions[option] });
  };

  return (
    <div className={styles.filterSection}>
      {/* Barre de recherche avec icône */}
      <div className={styles.filterColumn}>
        <h2>Recherche</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher..."
            className={styles.searchInput}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </div>

      {/* Sélecteur PC, Mobile, Toutes */}
      <div className={styles.filterColumn}>
        <h2>Type d{"'"}appareil</h2>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className={styles.select}
        >
          <option value="toutes">Toutes</option>
          <option value="pc">PC</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      {/* Options pour PC */}
      {selectedOption === "pc" && (
        <PcOptions
          pcOptions={pcOptions}
          handlePcOptionChange={handlePcOptionChange}
        />
      )}

      {/* Options pour Mobile */}
      {selectedOption === "mobile" && (
        <MobileOptions
          mobileOptions={mobileOptions}
          handleMobileOptionChange={handleMobileOptionChange}
        />
      )}
    </div>
  );
};

export default Filtrage;