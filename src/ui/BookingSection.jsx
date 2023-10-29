import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getCurrentUser } from '../services/apiAuth';
import axiosInstance from '../services/axiosInstance.js';

import Button from './Button';
import SpinnerMini from './SpinnerMini';

import styles from './BookingSection.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

const BookingSection = ({ tour }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  async function handleBookTour(tour) {
    if (!user) return navigate('/login');

    setIsLoading(true);

    const {
      data: { key },
    } = await axiosInstance('/api/v1/bookings/getKey');

    const {
      data: { order },
    } = await axiosInstance.post('/api/v1/bookings/checkout', {
      slug: tour.slug,
    });

    setIsLoading(false);

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: tour.name,
      description: tour.summary,
      image: '/img/logo-green-small.png',
      order_id: order.id,
      callback_url: `${BASE_API_URL}/api/v1/bookings/createBooking?tour=${tour.id}&user=${order.user._id}&price=${order.amount}`,
      redirect: true,
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#7dd56f',
      },
    };

    const razor = new Razorpay(options);
    razor.open();
  }

  return (
    <div className={styles.booking}>
      <div className={styles.imageList}>
        <img
          className={`${styles.bookingImage} ${styles.logo}`}
          src='/img/logo-green-round.png'
          alt='logo green round'
        />
        <img
          className={`${styles.bookingImage} ${styles.image1}`}
          src={`${BASE_API_URL}/img/tours/${tour.images[1]}`}
          alt={`image of the tour ${tour.images[1]}`}
        />
        <img
          className={`${styles.bookingImage} ${styles.image2}`}
          src={`${BASE_API_URL}/img/tours/${tour.images[2]}`}
          alt={`image of the tour ${tour.images[2]}`}
        />
      </div>

      <div className={styles.bookingHeading}>
        <h2>What are you waiting for?</h2>
        <p>
          {tour.duration} days. 1 adventure. Infinite memories. Make it yours
          today!
        </p>
      </div>

      <Button
        disabled={isLoading}
        type='primary'
        className={styles.bookButton}
        onClick={() => handleBookTour(tour)}
      >
        {user ? (
          isLoading ? (
            <SpinnerMini />
          ) : (
            'Book tour now'
          )
        ) : (
          'Login to book tour'
        )}
      </Button>
    </div>
  );
};

export default BookingSection;
