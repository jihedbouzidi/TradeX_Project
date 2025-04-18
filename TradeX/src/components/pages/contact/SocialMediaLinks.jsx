// components/ContactForm/SocialMediaLinks.jsx
import styles from "./ContactForm.module.css";

export const SocialMediaLinks = () => {
  return (
    <div className={`${styles.social_media_links} ${styles.mob}`}>
      <a className={styles.social_icon_link} href="#" id={styles.ix94i_2_2}>
        <img
          className={`${styles.link_img} ${styles.image_block}`}
          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
          alt="Twitter"
        />
      </a>
      <a className={styles.social_icon_link} href="#" id={styles.itixd}>
        <img
          className={`${styles.link_img} ${styles.image_block}`}
          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
          alt="Facebook"
        />
      </a>
      <a className={styles.social_icon_link} href="#" id={styles.izxvt}>
        <img
          className={`${styles.link_img} ${styles.image_block}`}
          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
          alt="Google"
        />
      </a>
      <a className={styles.social_icon_link} href="#" id={styles.izldf_2_2}>
        <img
          className={`${styles.link_img} ${styles.image_block}`}
          src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
          alt="Instagram"
        />
      </a>
    </div>
  );
};