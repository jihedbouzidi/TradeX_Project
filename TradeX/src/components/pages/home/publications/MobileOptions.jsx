/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./AddPublication.module.css";

const MobileOptions = ({ setSelectedCharacteristics }) => {
  const [mobileOptions, setMobileOptions] = useState({
    camera: false,
    stockage: false,
    ram: false,
    batterie: false,
  });

  const [cameraPerformance, setCameraPerformance] = useState("");
  const [stockageCapacity, setStockageCapacity] = useState("");
  const [ramCapacity, setRamCapacity] = useState("");
  const [batteriePerformance, setBatteriePerformance] = useState("");

  const handleMobileOptionChange = (option) => {
    setMobileOptions({ ...mobileOptions, [option]: !mobileOptions[option] });
  };

  useEffect(() => {
    let characteristics = "";
    if (mobileOptions.camera) {
      characteristics += `Caméra : ${cameraPerformance},\n`;
    }
    if (mobileOptions.stockage) {
      characteristics += `Stockage : ${stockageCapacity}${stockageCapacity ? "GB," : ","}\n`;
    }
    if (mobileOptions.ram) {
      characteristics += `RAM : ${ramCapacity}${ramCapacity ? "GB," : ","}\n`;
    }
    if (mobileOptions.batterie) {
      characteristics += `Batterie : ${batteriePerformance},\n`;
    }
    setSelectedCharacteristics(characteristics);
  }, [mobileOptions, cameraPerformance, stockageCapacity, ramCapacity, batteriePerformance, setSelectedCharacteristics]);

  return (
    <>
    <br /><br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={mobileOptions.camera}
          onChange={() => handleMobileOptionChange("camera")}
        />
        Caméra
      </label>
      <br />
      {mobileOptions.camera && (
        <div className={styles.subOptions}>
          <h3>Performance</h3>
          <select
            className={styles.select}
            value={cameraPerformance}
            onChange={(e) => setCameraPerformance(e.target.value)}
          >
            <option value="">Selection Performance</option>
            <option value="normale">Normale</option>
            <option value="milieu">Milieu</option>
            <option value="haute">Haute performance</option>
          </select>
        </div>
      )}
      <br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={mobileOptions.stockage}
          onChange={() => handleMobileOptionChange("stockage")}
        />
        Stockage
      </label>
      <br />
      {mobileOptions.stockage && (
        <div className={styles.subOptions}>
          <h3>Capacité</h3>
          <select
            className={styles.select}
            value={stockageCapacity}
            onChange={(e) => setStockageCapacity(e.target.value)}
          >
            <option value="">Selection Stockage</option>
            <option value="64">64GB</option>
            <option value="128">128GB</option>
            <option value="256">256GB</option>
            <option value="512">512GB</option>
          </select>
        </div>
      )}
      <br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={mobileOptions.ram}
          onChange={() => handleMobileOptionChange("ram")}
        />
        RAM
      </label>
      <br />
      {mobileOptions.ram && (
        <div className={styles.subOptions}>
          <h3>Quantité de RAM</h3>
          <select
            className={styles.select}
            value={ramCapacity}
            onChange={(e) => setRamCapacity(e.target.value)}
          >
            <option value="">Selection Ram</option>
            <option value="4">4GB</option>
            <option value="8">8GB</option>
            <option value="12">12GB</option>
            <option value="16">16GB</option>
          </select>
        </div>
      )}
      <br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={mobileOptions.batterie}
          onChange={() => handleMobileOptionChange("batterie")}
        />
        Batterie
      </label>
      <br />
      {mobileOptions.batterie && (
        <div className={styles.subOptions}>
          <h3>Performance</h3>
          <select
            className={styles.select}
            value={batteriePerformance}
            onChange={(e) => setBatteriePerformance(e.target.value)}
          >
            <option value="">Performance Batterie</option>
            <option value="normale">Normale</option>
            <option value="milieu">Milieu</option>
            <option value="haute">Haute performance</option>
          </select>
        </div>
      )}
    </>
  );
};

export default MobileOptions;