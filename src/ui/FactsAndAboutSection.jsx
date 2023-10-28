import About from './About';
import Facts from './Facts';

import styles from './FactsAndAboutSection.module.css';

const FactsAndAboutSection = ({ tour }) => {
  return (
    <section className={styles.factsAndAbout}>
      <Facts tour={tour} />
      <About tour={tour} />
    </section>
  );
};

export default FactsAndAboutSection;
