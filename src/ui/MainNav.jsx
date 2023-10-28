import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../services/apiAuth';
import { userLogout } from '../authentication/userSlice';

import styles from './MainNav.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

function MainNav() {
  let user = getCurrentUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: userState } = useSelector(state => state.user);

  if (userState) user = userState;

  function handleLogout() {
    toast.success('You are logged out');
    dispatch(userLogout());

    setTimeout(() => {
      localStorage.clear();
      navigate('/login');
    }, 0);
  }

  return (
    <header className={styles.mainNav}>
      <Link to='/'>
        <img className={styles.logo} src='/img/logo-white.png' />
      </Link>
      <ul className={styles.navList}>
        <li>
          {user ? (
            <span className={styles.user} onClick={() => navigate('/account')}>
              {user.photo ? (
                <img src={`${BASE_API_URL}/img/users/${user.photo}`} />
              ) : (
                <span className={styles.nameInitial}>
                  {user.name.at(0).toUpperCase()}
                </span>
              )}
              <p>{user.name}</p>
            </span>
          ) : (
            <NavLink to='/login'>Login</NavLink>
          )}
        </li>
        <li>
          {user ? (
            <NavLink to='' onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink to='/signup'>Signup</NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}

export default MainNav;
