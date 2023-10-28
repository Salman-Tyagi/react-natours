import { useEffect, useState } from 'react';

import { getTours } from '../services/apiTours';

import TourItem from './TourItem';
import styles from './Home.module.css';
import Spinner from '../ui/Spinner';

export default function Home() {
  const [tours, setTours] = useState([]);

  async function getAllTours() {
    const data = await getTours();
    setTours(data);
  }

  useEffect(() => {
    getAllTours();
  }, []);

  if (tours && !tours.length) return <Spinner />;

  return (
    <ul className={styles.cards}>
      {tours.map(tour => (
        <TourItem tour={tour} key={tour._id} />
      ))}
    </ul>
  );
}
