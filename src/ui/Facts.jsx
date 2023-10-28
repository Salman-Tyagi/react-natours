import {
  HiOutlineArrowTrendingUp,
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineUser,
} from 'react-icons/hi2';

import styles from './Facts.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

function Facts({ tour }) {
  return (
    <div className={styles.facts}>
      <div className={styles.quickFacts}>
        <h1>Quick facts</h1>
        <ul>
          <li>
            <span>
              <HiOutlineCalendar />
            </span>
            <strong>Next Date</strong>
            <span>
              {new Date(tour.startDates.at(1)).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </li>
          <li>
            <span>
              <HiOutlineArrowTrendingUp />
            </span>
            <strong>Difficulty</strong>
            <span>
              {tour.difficulty.at(0).toUpperCase() + tour.difficulty.slice(1)}
            </span>
          </li>
          <li>
            <span>
              <HiOutlineUser />
            </span>
            <strong>Participants</strong>
            <span>{tour.maxGroupSize} People</span>
          </li>
          <li>
            <span>
              <HiOutlineStar />
            </span>
            <strong>Rating</strong>
            <span>{tour.ratingsAverage} / 5</span>
          </li>
        </ul>
      </div>
      <div className={styles.quickFacts}>
        <h1>Your tour guides</h1>
        <ul>
          {tour.guides.map(guide => (
            <li key={guide._id}>
              <img
                src={`${BASE_API_URL}/img/users/${guide.photo}`}
                alt={`avatar of the ${guide.name}`}
              />
              <strong>
                {guide.role === 'guide' ? 'tour-guide' : guide.role}
              </strong>
              <span>{guide.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Facts;
