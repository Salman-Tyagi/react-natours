import { HiOutlineStar } from 'react-icons/hi2';

import styles from './Testimonials.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

const Testimonials = ({ tour: { guides } }) => {
  return (
    <ul className={styles.cardTestimonials}>
      {guides.map(guide => (
        <li className={styles.card} key={guide.name}>
          <img
            className={styles.testimonialImg}
            src={`${BASE_API_URL}/img/users/${guide.photo}`}
            alt={`photo of the ${guide.name}`}
          />
          <span className={styles.guideName}>{guide.name}</span>

          <p className={styles.testimonialDesciption}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            aliquam, animi consectetur voluptatibus ipsa eaque itaque illo in
            officiis quam, laboriosam voluptatum recusandae minima. Aut, quia!
            Veritatis necessitatibus laboriosam corrupti!
          </p>
          <ul className={styles.startList}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star, i) => (
              <li className={styles.starRating} key={i + 1}>
                <HiOutlineStar />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Testimonials;
