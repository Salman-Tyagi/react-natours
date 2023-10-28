import styles from './ImageCover.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

const ImageCover = ({ tour }) => {
  return (
    <header className={styles.header}>
      <img
        className={styles.img}
        src={`${BASE_API_URL}/img/tours/${tour.imageCover}`}
        alt={`cover image of the ${tour.name}`}
      />
      <div className={styles.tourDetails}>
        <h1>{tour.name}</h1>
        <p>{tour.duration} Days</p>
        <p>{tour.startLocation.description}</p>
      </div>
    </header>
  );
};

export default ImageCover;
