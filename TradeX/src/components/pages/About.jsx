import styles from "./About.module.css"; // Importez les styles CSS

export const About = () => {
  return (
    <div className={styles.about_us}>
      <div className={styles.container}>
        {/* Section Hero */}
        <div className={styles.hero_section}>
          <h1 className={styles.hero_title}>À Propos de TradeX</h1>
          <p className={styles.hero_subtitle}>
            TradeX est une plateforme innovante conçue par des étudiants, pour
            des étudiants, afin de faciliter l&#39;échange de matériel
            technologique. Que vous cherchiez un PC, un téléphone, une tablette
            ou tout autre appareil, TradeX vous permet de trouver facilement du
            matériel compatible avec vos besoins spécifiques.
          </p>
        </div>

        {/* Section Mission */}
        <div className={styles.section}>
          <div className={styles.section_content}>
            <h2 className={styles.section_title}>Notre Mission</h2>
            <p className={styles.section_text}>
              Notre mission est de simplifier la recherche de matériel
              technologique pour les étudiants. Grâce à TradeX, vous pouvez
              échanger ou acheter du matériel qui correspond exactement à vos
              besoins, tout en aidant d&#39;autres étudiants à trouver ce
              qu&#39;ils recherchent.
            </p>
          </div>
          <div className={styles.section_image}>
            {/*image 1*/}
            <img src="mission.png" alt="Notre Mission" />
          </div>
        </div>

        {/* Section Fonctionnement */}
        <div className={styles.section}>
          <div className={styles.section_image}>
            {/*image 2*/}
            <img src="how-it-works.png" alt="Comment ça marche" />
          </div>
          <div className={styles.section_content}>
            <h2 className={styles.section_title}>Comment Ça Marche ?</h2>
            <ul className={styles.section_list}>
              <li>
                <strong>Créez un compte</strong> : Inscrivez-vous en quelques
                minutes pour accéder à la plateforme.
              </li>
              <li>
                <strong>Recherchez du matériel</strong> : Utilisez nos filtres
                pour trouver le matériel qui correspond à vos besoins.
              </li>
              <li>
                <strong>Contactez le vendeur</strong> : Échangez avec
                d&#39;autres étudiants pour finaliser l&#39;achat ou
                l&#39;échange.
              </li>
              <li>
                <strong>Profitez de votre nouvel appareil</strong> : Trouvez le
                matériel parfait pour vos études ou vos projets personnels.
              </li>
            </ul>
          </div>
        </div>

        {/* Section Pourquoi TradeX */}
        <div className={styles.section}>
          <div className={styles.section_content}>
            <h2 className={styles.section_title}>Pourquoi Choisir TradeX ?</h2>
            <ul className={styles.section_list}>
              <li>
                <strong>Matériel vérifié</strong> : Tous les appareils sont
                vérifiés pour garantir leur qualité.
              </li>
              <li>
                <strong>Économique</strong> : Trouvez des offres adaptées à
                votre budget.
              </li>
              <li>
                <strong>Communauté étudiante</strong> : Échangez avec des
                étudiants partageant les mêmes besoins.
              </li>
            </ul>
          </div>
          <div className={styles.section_image}>
            {/*image 3*/}
            <img src="why-choose-us.png" alt="Pourquoi TradeX" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
