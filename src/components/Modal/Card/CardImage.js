import styles from './CardImage.module.css';

const CardImage = ({ src, title }) => {
  return (
    <div className={styles[`image-box`]}>
      <img className={styles.image} src={src} alt={title} />
    </div>
  );
};

export default CardImage;
