/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./AddPublication.module.css";
import PcOptions from "./PcOptions";
import MobileOptions from "./MobileOptions";

const CharacteristicsForm = ({ setSelectedCharacteristics, setSelectedOption }) => {
  const [selectedDevice, setSelectedDevice] = useState("select");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedDevice(value);
    setSelectedOption(value);
    setSelectedCharacteristics(""); // Reset characteristics when device changes
  };

  return (
    <div className={styles.characteristics}>
      <select
        value={selectedDevice}
        onChange={handleOptionChange}
        className={styles.select}
      >
        <option value="select">Selection Le Type d{"'"}appareil</option>
        <option value="PC">PC</option>
        <option value="mobile">Mobile</option>
      </select>

      {selectedDevice === "PC" && (
        <PcOptions setSelectedCharacteristics={setSelectedCharacteristics} />
      )}
      {selectedDevice === "mobile" && (
        <MobileOptions setSelectedCharacteristics={setSelectedCharacteristics} />
      )}
    </div>
  );
};

export default CharacteristicsForm;