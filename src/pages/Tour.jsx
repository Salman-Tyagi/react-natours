import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTourBySlug } from '../services/apiTours';

import ImageCover from '../ui/ImageCover';
import BookingSection from '../ui/BookingSection';
import FactsAndAboutSection from '../ui/FactsAndAboutSection';
import MiddleImagesSection from '../ui/MiddleImagesSection';
import TestimonialsSection from '../ui/TestimonialsSection';

import styles from './Tour.module.css';
import Spinner from '../ui/Spinner';

export default function Tour() {
  const [tour, setTour] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function getTour() {
      const tour = await getTourBySlug(slug);
      setTour(tour);
    }

    getTour();
  }, []);

  if (!tour) return <Spinner />;

  return (
    <main className={styles.container}>
      <ImageCover tour={tour} />
      <FactsAndAboutSection tour={tour} />
      <MiddleImagesSection tour={tour} />
      <TestimonialsSection tour={tour} />
      <BookingSection tour={tour} />
    </main>
  );
}
