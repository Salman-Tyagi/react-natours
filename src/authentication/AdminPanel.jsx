import { NavLink } from 'react-router-dom';

import styles from './AdminPanel.module.css';
import {
  HiOutlineBriefcase,
  HiOutlineMap,
  HiOutlineStar,
  HiOutlineUsers,
} from 'react-icons/hi2';

function AdminPanel() {
  return (
    <div className={styles.adminPanel}>
      <h3>Admin</h3>
      <NavLink to='#settings' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineMap />
        </span>
        Manage tours
      </NavLink>

      <NavLink to='#settings' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineUsers />
        </span>
        Manage users
      </NavLink>

      <NavLink to='#settings' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineStar />
        </span>
        Manage reviews
      </NavLink>

      <NavLink to='#settings' className={styles.row}>
        <span className={styles.icon}>
          <HiOutlineBriefcase />
        </span>
        Manage billings
      </NavLink>
    </div>
  );
}

export default AdminPanel;
