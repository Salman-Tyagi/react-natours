import styles from './BookItem.module.css';

function BookItem({ book = [] }) {
  const {
    createdAt: date,
    orderId,
    paymentId,
    price,
    tour: { name: tourName },
  } = book;

  return (
    <li className={styles.bookItem}>
      <div className={styles.details}>
        <p className={styles.date}>
          <span>
            <strong>Date: </strong>
          </span>
          <span>
            {new Date(date).toLocaleString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </p>
        <p>
          <strong>Order# </strong> {orderId}
        </p>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Payment# </strong> {paymentId}
        </p>
        <footer className={styles.footer}>
          <p>
            <strong>{tourName}</strong>
          </p>
          <p>
            <strong>Paid: {price.toFixed(2)}</strong>
          </p>
        </footer>
      </div>
    </li>
  );
}

export default BookItem;
