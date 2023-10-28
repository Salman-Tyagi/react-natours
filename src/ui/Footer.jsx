import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <img src='/img/logo-green.png' alt='Natours logo' />
      </div>
      <ul className={styles.footerNav}>
        <li>
          <Link to='#'>About us</Link>
        </li>
        <li>
          <Link to='#'>Download apps</Link>
        </li>
        <li>
          <Link to='#'>Become a guide</Link>
        </li>
        <li>
          <Link to='#'>Careers</Link>
        </li>
        <li>
          <Link to='#'>Contact</Link>
        </li>
      </ul>
      <p className={styles.footerCopyright}>&copy; by Salman Tyagi</p>
    </footer>
  );
}

export default Footer;
