import styles from './Button.module.css';

function Button({ children, type, onClick, disabled, className }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
