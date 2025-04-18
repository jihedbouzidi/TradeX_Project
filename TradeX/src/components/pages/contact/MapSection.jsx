
import styles from "./ContactForm.module.css";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const MapSection = () => {
  return (
    <div
      className={`${styles.responsive_cell_block} ${styles.wk_desk_7} ${styles.wk_ipadp_12} ${styles.wk_tab_12} ${styles.wk_mobile_12}`}
      id={styles.i772w}
    >
      <div className={styles.map_part}>
        <p className={styles.logoContainer}>
          <img
            className={styles.imgLogo}
            src="logo.png"
            alt="image non disponible"
          />
          <strong>TradeX</strong>
        </p>
        <p className={`${styles.text_blk} ${styles.map_contactus_subhead}`}>
          Remplissez le formulaire lorsque vous avez terminé, vous sortirez
          d&#39;ici et ensuite 1 à 2 jours ouvrables.
        </p>
        <SocialMediaLinks />
        <div className={`${styles.map_box} ${styles.container_block}`}></div>
      </div>
    </div>
  );
};