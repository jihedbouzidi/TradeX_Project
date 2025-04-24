/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from "./Filtrage.module.css";

const PcOptions = ({ onPcOptionChange }) => {
    const [options, setOptions] = useState({
        disqueDur: false,
        ram: false,
        carteGraphique: false,
        processeur: false,
        disqueDurType: '',
        disqueDurCapacite: '',
        ramValue: '',
        carteGraphiqueValue: '',
        processeurValue: ''
    });

    useEffect(() => {
        onPcOptionChange(options);
    }, [options, onPcOptionChange]);

    const handleOptionToggle = (option) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleOptionChange = (option, value) => {
        setOptions(prev => ({
            ...prev,
            [option]: value
        }));
    };

    return (
        <>
            <div className={styles.filterColumn}>
                <h2>Options PC</h2>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.disqueDur}
                        onChange={() => handleOptionToggle('disqueDur')}
                    />
                    Disque Dur
                </label>
                {options.disqueDur && (
                    <>
                        <div className={styles.subOptions}>
                            <h3>Type de disque dur</h3>
                            <select
                                className={styles.select}
                                value={options.disqueDurType}
                                onChange={(e) => handleOptionChange('disqueDurType', e.target.value)}
                            >
                                <option value="">Tous</option>
                                <option value="hdd">HDD</option>
                                <option value="ssd">SSD</option>
                                <option value="nvme">NVMe</option>
                            </select>
                        </div>
                        <div className={styles.subOptions}>
                            <h3>Capacité</h3>
                            <select
                                className={styles.select}
                                value={options.disqueDurCapacite}
                                onChange={(e) => handleOptionChange('disqueDurCapacite', e.target.value)}
                            >
                                <option value="">Tous</option>
                                <option value="256">256GB</option>
                                <option value="512">512GB</option>
                                <option value="1024">1TB</option>
                                <option value="2048">2TB</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            <div className={styles.filterColumn}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.ram}
                        onChange={() => handleOptionToggle('ram')}
                    />
                    RAM
                </label>
                {options.ram && (
                    <div className={styles.subOptions}>
                        <select
                            className={styles.select}
                            value={options.ramValue}
                            onChange={(e) => handleOptionChange('ramValue', e.target.value)}
                        >
                            <option value="">Tous</option>
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
                        checked={options.carteGraphique}
                        onChange={() => handleOptionToggle('carteGraphique')}
                    />
                    Carte Graphique
                </label>
                {options.carteGraphique && (
                    <div className={styles.subOptions}>
                        <select
                            className={styles.select}
                            value={options.carteGraphiqueValue}
                            onChange={(e) => handleOptionChange('carteGraphiqueValue', e.target.value)}
                        >
                            <option value="">Tous</option>
                            <option value="nvidia">NVIDIA</option>
                            <option value="amd">AMD</option>
                            <option value="intel">Intel</option>
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.filterColumn}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.processeur}
                        onChange={() => handleOptionToggle('processeur')}
                    />
                    Processeur
                </label>
                {options.processeur && (
                    <div className={styles.subOptions}>
                        <select
                            className={styles.select}
                            value={options.processeurValue}
                            onChange={(e) => handleOptionChange('processeurValue', e.target.value)}
                        >
                            <option value="">Tous</option>
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