/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from "./Filtrage.module.css";

const MobileOptions = ({ onMobileOptionChange }) => {
    const [options, setOptions] = useState({
        camera: false,
        stockage: false,
        ram: false,
        batterie: false,
        cameraValue: '',
        stockageValue: '',
        ramValue: '',
        batterieValue: ''
    });

    useEffect(() => {
        onMobileOptionChange(options);
    }, [options, onMobileOptionChange]);

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
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.camera}
                        onChange={() => handleOptionToggle('camera')}
                    />
                    Caméra
                </label>
                {options.camera && (
                    <div className={styles.subOptions}>
                        <select 
                            className={styles.select}
                            value={options.cameraValue}
                            onChange={(e) => handleOptionChange('cameraValue', e.target.value)}
                        >
                            <option value="">Tous</option>
                            <option value="haute">Haute résolution</option>
                            <option value="moyenne">Moyenne résolution</option>
                            <option value="basique">Basique</option>
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.filterColumn}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.stockage}
                        onChange={() => handleOptionToggle('stockage')}
                    />
                    Stockage
                </label>
                {options.stockage && (
                    <div className={styles.subOptions}>
                        <select
                            className={styles.select}
                            value={options.stockageValue}
                            onChange={(e) => handleOptionChange('stockageValue', e.target.value)}
                        >
                            <option value="">Tous</option>
                            <option value="64">64GB</option>
                            <option value="128">128GB</option>
                            <option value="256">256GB</option>
                            <option value="512">512GB</option>
                        </select>
                    </div>
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
                            <option value="4">4GB</option>
                            <option value="6">6GB</option>
                            <option value="8">8GB</option>
                            <option value="12">12GB</option>
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.filterColumn}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={options.batterie}
                        onChange={() => handleOptionToggle('batterie')}
                    />
                    Batterie
                </label>
                {options.batterie && (
                    <div className={styles.subOptions}>
                        <select
                            className={styles.select}
                            value={options.batterieValue}
                            onChange={(e) => handleOptionChange('batterieValue', e.target.value)}
                        >
                            <option value="">Tous</option>
                            <option value="4000">4000mAh+</option>
                            <option value="5000">5000mAh+</option>
                            <option value="6000">6000mAh+</option>
                        </select>
                    </div>
                )}
            </div>
        </>
    );
};

export default MobileOptions;