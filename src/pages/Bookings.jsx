import { useEffect, useState } from 'react';
import { getAllBookings } from '../services/apiBookings';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../services/apiAuth';
import BookItem from './BookItem';

import styles from './Bookings.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
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

      if (
        res.status === 'fail' &&
        res.message === 'User recently changed password! Please login again'
      ) {
        toast.error('You have changed password! Please login again', {
          id: 'error',
          duration: 2000,
        });
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
