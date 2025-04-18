import styles from "./ContactForm.module.css";

export const ContactHeader = () => {
  return (
    <div className={styles.mob_text}>
      <p className={`${styles.text_blk} ${styles.contactus_head}`}>
        Contactez-nous
      </p>
      <p className={`${styles.text_blk} ${styles.contactus_subhead}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis diam
        lectus sapien.
      </p>
    </div>
  );
};
