/* eslint-disable react/prop-types */
import styles from "./Filtrage.module.css";

const MobileOptions = ({ mobileOptions, handleMobileOptionChange }) => {
  return (
    <>
      <div className={styles.filterColumn}>
        <h2>Options Mobile</h2>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={mobileOptions.camera}
            onChange={() => handleMobileOptionChange("camera")}
          />
          Caméra
        </label>
        {mobileOptions.camera && (
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
            checked={mobileOptions.stockage}
            onChange={() => handleMobileOptionChange("stockage")}
          />
          Stockage
        </label>
        {mobileOptions.stockage && (
          <div className={styles.subOptions}>
            <h3>Capacité</h3>
            <select className={styles.select}>
              <option value="64gb">64GB</option>
              <option value="128gb">128GB</option>
              <option value="256gb">256GB</option>
              <option value="512gb">512GB</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.filterColumn}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={mobileOptions.ram}
            onChange={() => handleMobileOptionChange("ram")}
          />
          RAM
        </label>
        {mobileOptions.ram && (
          <div className={styles.subOptions}>
            <h3>Quantité de RAM</h3>
            <select className={styles.select}>
              <option value="4">4GB</option>
              <option value="8">8GB</option>
              <option value="12">12GB</option>
              <option value="16">16GB</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.filterColumn}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={mobileOptions.batterie}
            onChange={() => handleMobileOptionChange("batterie")}
          />
          Batterie
        </label>
        {mobileOptions.batterie && (
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
    </>
  );
};

export default MobileOptions;