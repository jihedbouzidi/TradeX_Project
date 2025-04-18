/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./AddPublication.module.css";

const PcOptions = ({ setSelectedCharacteristics }) => {
  const [pcOptions, setPcOptions] = useState({
    disqueDur: false,
    ram: false,
    carteGraphique: false,
    processeur: false,
  });

  const [disqueDurType, setDisqueDurType] = useState("");
  const [disqueDurCapacity, setDisqueDurCapacity] = useState("");
  const [ramCapacity, setRamCapacity] = useState("");
  const [carteGraphiquePerformance, setCarteGraphiquePerformance] = useState("");
  const [processeurPerformance, setProcesseurPerformance] = useState("");

  const handlePcOptionChange = (option) => {
    setPcOptions({ ...pcOptions, [option]: !pcOptions[option] });
  };

  useEffect(() => {
    let characteristics = "";
    if (pcOptions.disqueDur) {
      characteristics += `Disque Dur : ${disqueDurType} ,`;
      if (disqueDurCapacity === "1") {
        characteristics += `${disqueDurCapacity} TO,\n`;
      } else if (disqueDurCapacity === "128" || disqueDurCapacity === "256" || disqueDurCapacity === "512") {
        characteristics += `${disqueDurCapacity}GB,\n`;
      } else {
        characteristics += "";
      }
    }
    if (pcOptions.ram) {
      characteristics += `RAM : ${ramCapacity}${ramCapacity ? "GB," : ","}\n`;
    }
    if (pcOptions.carteGraphique) {
      characteristics += `Performance Carte Graphique : ${carteGraphiquePerformance},\n`;
    }
    if (pcOptions.processeur) {
      if (processeurPerformance === "i3" || processeurPerformance === "i5" || processeurPerformance === "i7" || processeurPerformance === "i9") {
        characteristics += `Processeur : Intel Core ${processeurPerformance},\n`;
      } else if (processeurPerformance === "ryzen3" || processeurPerformance === "ryzen5" || processeurPerformance === "ryzen7" || processeurPerformance === "ryzen9") {
        characteristics += `Processeur : AMD Ryzen ${processeurPerformance},\n`;
      }
    }
    setSelectedCharacteristics(characteristics);
  }, [pcOptions, disqueDurType, disqueDurCapacity, ramCapacity, carteGraphiquePerformance, processeurPerformance, setSelectedCharacteristics]);

  return (
    <>
    <br /><br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={pcOptions.disqueDur}
          onChange={() => handlePcOptionChange("disqueDur")}
        />
        Disque Dur
      </label>
      <br /><br />
      {pcOptions.disqueDur && (
        <>
          <div className={styles.subOptions}>
            <h3>Type de disque dur</h3>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="disqueDurType"
                checked={disqueDurType === "HDD"}
                onChange={() => setDisqueDurType("HDD")}
              />
              HDD
            </label>
            <br />
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="disqueDurType"
                checked={disqueDurType === "SSD"}
                onChange={() => setDisqueDurType("SSD")}
              />
              SSD
            </label>
            <br />
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="disqueDurType"
                checked={disqueDurType === "M.2"}
                onChange={() => setDisqueDurType("M.2")}
              />
              M.2
            </label>
            <br />
          </div>
          <div className={styles.subOptions}>
            <h3>Capacité</h3>
            <select
              className={styles.select}
              value={disqueDurCapacity}
              onChange={(e) => setDisqueDurCapacity(e.target.value)}
            >
              <option value="select">selection la Capacité</option>
              <option value="128">128GB</option>
              <option value="256">256GB</option>
              <option value="512">512GB</option>
              <option value="1">1TO</option>
            </select>
          </div>
          <br />
        </>
      )}

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={pcOptions.ram}
          onChange={() => handlePcOptionChange("ram")}
        />
        RAM
      </label>
      <br />
      {pcOptions.ram && (
        <div className={styles.subOptions}>
          <h3>Quantité de RAM</h3>
          <select
            className={styles.select}
            value={ramCapacity}
            onChange={(e) => setRamCapacity(e.target.value)}
          >
            <option value="select">selection la Quantité de Ram</option>
            <option value="8">8GB</option>
            <option value="16">16GB</option>
            <option value="32">32GB</option>
            <option value="64">64GB</option>
          </select>
        </div>
      )}
      <br />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={pcOptions.carteGraphique}
          onChange={() => handlePcOptionChange("carteGraphique")}
        />
        Carte Graphique
      </label>
      <br />
      {pcOptions.carteGraphique && (
        <div className={styles.subOptions}>
          <h3>Performance</h3>
          <select
            className={styles.select}
            value={carteGraphiquePerformance}
            onChange={(e) => setCarteGraphiquePerformance(e.target.value)}
          >
            <option value="select">selection la Performance</option>
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
          checked={pcOptions.processeur}
          onChange={() => handlePcOptionChange("processeur")}
        />
        Processeur
      </label>
      <br />
      {pcOptions.processeur && (
        <div className={styles.subOptions}>
          <h3>Performance</h3>
          <select
            className={styles.select}
            value={processeurPerformance}
            onChange={(e) => setProcesseurPerformance(e.target.value)}
          >
            <option value="select">selection la Performance</option>
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
    </>
  );
};

export default PcOptions;