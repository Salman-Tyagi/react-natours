import styles from './ImageList.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

const ImageList = ({ tour: { images } }) => {
  return (
    <ul className={styles.imageList}>
      {images.map(image => (
        <li key={image}>
          <img
            className={styles.image}
            src={`${BASE_API_URL}/img/tours/${image}`}
            alt={`tour image of ${image}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
