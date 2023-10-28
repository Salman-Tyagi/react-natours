import UpdateUserData from './UpdateUserData';
import UpdateUserPassword from './UpdateUserPassword';
import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';

import { getCurrentUser } from '../services/apiAuth';

import styles from './Account.module.css';

function Account() {
  const user = getCurrentUser();

  return (
    <div className={styles.account}>
      <div role='sidebar' className={styles.sideBar}>
        <UserPanel />
        {user.role === 'admin' && <AdminPanel />}
      </div>
      <UpdateUserData />
      <UpdateUserPassword />
    </div>
  );
}

export default Account;
