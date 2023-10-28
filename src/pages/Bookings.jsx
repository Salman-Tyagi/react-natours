import { useEffect, useState } from 'react';
import { getAllBookings } from '../services/apiBookings';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../services/apiAuth';
import BookItem from './BookItem';

import styles from './Bookings.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../ui/Spinner';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let user = getCurrentUser();
  const { user: userState } = useSelector(state => state.user);

  if (userState) user = userState;

  useEffect(() => {
    async function getBookings() {
      setIsLoading(true);

      const res = await getAllBookings(user._id);
      if (res.status === 'success') {
        setBookings(res.data);
      }

      setIsLoading(false);
    }

    getBookings();
  }, []);

  if (isLoading) return <Spinner />;

  if (!bookings.length)
    return (
      <div className={styles.noTourBookings}>
        <h1>
          You have not purchased any tour yet! 😥
          <br />
          <Link to='/'>Click here</Link> to purchase one
        </h1>
      </div>
    );

  return (
    <>
      <h1 className={styles.purchasedTourTitle}>Purchased tours</h1>
      <ul className={styles.bookings}>
        {bookings.map(book => (
          <BookItem book={book} key={book._id} />
        ))}
      </ul>
    </>
  );
}

export default Bookings;
