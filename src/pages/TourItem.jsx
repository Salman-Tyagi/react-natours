import { Link } from 'react-router-dom';
import {
  HiOutlineCalendar,
  HiOutlineFlag,
  HiOutlineMapPin,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import styles from './TourItem.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

function TourItem({ tour }) {
  return (
    <div className={styles.tourCard}>
      <div className={styles.cardHeader}>
        <img
          src={`${BASE_API_URL}/img/tours/${tour.imageCover}`}
          alt={`/image of the ${tour.name}`}
          className={styles.img}
        />

        <h3>{tour.name}</h3>
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.summary}>
          <h4>
            {tour.difficulty} {tour.duration} -day tour
          </h4>
          <p>
            <em>{tour.summary}</em>
          </p>
        </div>
        <div className={styles.description}>
          <div>
            <span>
              <HiOutlineMapPin />
            </span>
            {tour.startLocation.description}
          </div>
          <div>
            <span>
              <HiOutlineCalendar />
            </span>
            {new Date(tour.startDates.at(0)).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <div>
            <span>
              <HiOutlineFlag />
            </span>
            {tour.locations.length} stops
          </div>
          <div>
            <span>
              <HiOutlineUserCircle />
            </span>
            {tour.maxGroupSize} people
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div>
          <p>
            <strong>${tour.price}</strong> per person
          </p>
          <p>
            <strong>{tour.ratingsAverage}</strong> rating (
            {tour.ratingsQuantity})
          </p>
        </div>
        <Link to={`/tour/${tour.slug}`}>Details</Link>
      </div>
    </div>
  );
}

export default TourItem;
