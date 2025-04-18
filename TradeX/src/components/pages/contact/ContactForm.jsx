import styles from "./ContactForm.module.css";
import { ContactHeader } from "./ContactHeader";
import { ContactInput } from "./ContactInput";
import { MapSection } from "./MapSection";

export const ContactForm = () => {
  return (
    <div className={styles.contact_us_6}>
      <div
        className={`${styles.responsive_container_block} ${styles.container}`}
      >
        <form className={styles.form_box}>
          <div className={`${styles.container_block} ${styles.form_wrapper}`}>
            <ContactHeader />
            <div
              className={styles.responsive_container_block}
              id={styles.i2cbk}
            >
              <ContactInput
                id={styles.ijowk_3}
                name="FirstName"
                placeholder="Veuillez entrer votre prénom..."
                title="Nom d'utilisateur"
              />
              <ContactInput
                id={styles.ipmgh_3}
                name="Email"
                placeholder="Veuillez entrer votre e-mail..."
                title="E-MAIL"
                type="email"
              />
              <ContactInput
                id={styles.imgis_3}
                name="PhoneNumber"
                placeholder="Veuillez entrer votre numéro de téléphone..."
                title="NUMÉRO DE TÉLÉPHONE"
                type="tel"
              />
              <ContactInput
                id={styles.i5vyy_3}
                name="Message"
                placeholder="Veuillez entrer votre demande..."
                title="QUE POUVONS-NOUS FAIRE POUR VOUS ?"
                type="textarea"
              />
            </div>
            <button
              className={styles.submit_btn}
              id={styles.w_c_s_bgc_p_1_dm_id_2}
            >
              Envoyer
            </button>
          </div>
        </form>
        <MapSection />
      </div>
    </div>
  );
};

export default ContactForm;
