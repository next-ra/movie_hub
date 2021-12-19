import useMediaQuery from '../../../hooks/UseMediaQuery';
import styles from './Tags.module.css';

const Tags = ({ vote_average, genres, tagline }) => {
  const mobile = useMediaQuery(750, 549);

  let classes = mobile ? styles.hide : styles.tag;

  return (
    <div className={styles.tags}>
      <p className={classes}>
        <b>рейтинг</b>: {vote_average || 'отсутсвует'}
      </p>
      <p className={classes}>
        <b>жанр</b>: {genres}
      </p>
      <p className={classes}>
        <b>слоган</b>: {tagline || 'отсутсвует'}
      </p>
    </div>
  );
};

export default Tags;
