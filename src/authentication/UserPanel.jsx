import {
  HiOutlineCog8Tooth,
  HiOutlineCreditCard,
  HiOutlineStar,
  HiOutlineTicket,
} from 'react-icons/hi2';

import styles from './UserPanel.module.css';
import { NavLink } from 'react-router-dom';

function UserPanel() {
  return (
    <div className={styles.userPanel}>
      <NavLink to='/account' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineCog8Tooth />
        </span>
        Settings
      </NavLink>
      <NavLink to='/bookings' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineTicket />
        </span>
        My bookings
      </NavLink>
      <NavLink to='' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineStar />
        </span>
        My reviews
      </NavLink>
      <NavLink to='' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineCreditCard />
        </span>
        Billing
      </NavLink>
    </div>
  );
}

export default UserPanel;
