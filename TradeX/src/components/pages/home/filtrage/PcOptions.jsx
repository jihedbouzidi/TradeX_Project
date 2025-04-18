/* eslint-disable react/prop-types */
import styles from "./Filtrage.module.css";

const PcOptions = ({ pcOptions, handlePcOptionChange }) => {
  return (
    <>
      <div className={styles.filterColumn}>
        <h2>Options PC</h2>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={pcOptions.disqueDur}
            onChange={() => handlePcOptionChange("disqueDur")}
          />
          Disque Dur
        </label>
        {pcOptions.disqueDur && (
          <>
            <div className={styles.subOptions}>
              <h3>Type de disque dur</h3>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> HDD
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> SSD
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> M.2
              </label>
            </div>
            <div className={styles.subOptions}>
              <h3>Capacité</h3>
              <select className={styles.select}>
                <option value="128gb">128GB</option>
                <option value="256gb">256GB</option>
                <option value="512gb">512GB</option>
                <option value="1to">1TO</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className={styles.filterColumn}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={pcOptions.ram}
            onChange={() => handlePcOptionChange("ram")}
          />
          RAM
        </label>
        {pcOptions.ram && (
          <div className={styles.subOptions}>
            <h3>Quantité de RAM</h3>
            <select className={styles.select}>
              <option value="8">8GB</option>
              <option value="16">16GB</option>
              <option value="32">32GB</option>
              <option value="64">64GB</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.filterColumn}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={pcOptions.carteGraphique}
            onChange={() => handlePcOptionChange("carteGraphique")}
          />
          Carte Graphique
        </label>
        {pcOptions.carteGraphique && (
          <div className={styles.subOptions}>
            <h3>Performance</h3>
            <select className={styles.select}>
              <option value="normale">Normale</option>
              <option value="milieu">Milieu</option>
              <option value="haute">Haute performance</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.filterColumn}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={pcOptions.processeur}
            onChange={() => handlePcOptionChange("processeur")}
          />
          Processeur
        </label>
        {pcOptions.processeur && (
          <div className={styles.subOptions}>
            <h3>Performance</h3>
            <select className={styles.select}>
              <option value="i3">Intel Core i3</option>
              <option value="i5">Intel Core i5</option>
              <option value="i7">Intel Core i7</option>
              <option value="i9">Intel Core i9</option>
              <option value="ryzen3">AMD Ryzen 3</option>
              <option value="ryzen5">AMD Ryzen 5</option>
              <option value="ryzen7">AMD Ryzen 7</option>
              <option value="ryzen9">AMD Ryzen 9</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default PcOptions;