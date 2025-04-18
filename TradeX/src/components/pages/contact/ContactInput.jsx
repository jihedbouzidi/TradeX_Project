/* eslint-disable react/prop-types */
import styles from "./ContactForm.module.css";

export const ContactInput = ({ id, name, placeholder, title, type = "text" }) => {
  return (
    <div
      className={`${styles.responsive_cell_block} ${styles.wk_tab_12} ${styles.wk_mobile_12} ${styles.wk_desk_12} ${styles.wk_ipadp_12}`}
    >
      <p className={`${styles.text_blk} ${styles.input_title}`}>{title}</p>
      {type === "textarea" ? (
        <textarea
          className={styles.textinput}
          id={id}
          name={name}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className={styles.input}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      )}
    </div>
  );
};