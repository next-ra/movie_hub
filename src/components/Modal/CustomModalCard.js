import { Button } from '@mui/material';
import styles from './CustomModalCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Error from '../Error/Error';

const CustomModalCard = ({ config }) => {
  const {
    handleClose,
    title,
    poster,
    backdrop,
    year,
    originalTitle,
    vote_average,
    genres,
    tagline,
    overview,
    trailer,
    error,
    vError,
  } = config;

  return (
    <div className={styles.card}>
      <Button
        sx={{
          position: `absolute`,
          right: `1vw`,
          top: `1vw`,
          width: `32px`,
          height: `32px`,
          minWidth: `32px`,
        }}
        variant="contained"
        color="warning"
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
      <div className={styles[`poster-box`]}>
        <img className={styles.poster} src={poster} alt={title} />
        <img className={styles.backdrop} src={backdrop} alt={title} />
      </div>

      <div className={styles.info}>
        {error && <Error error={error} modal />}
        {!error && (
          <div className={styles[`title-container`]}>
            <h1 className={styles.title}>
              {title}&nbsp;({year})
            </h1>
            <h3 className={styles[`orginal-title`]}>{originalTitle}</h3>
          </div>
        )}
        {!error && (
          <div className={styles.box}>
            <p className={styles.tag}>
              <b>рейтинг</b>: {vote_average || 'отсутсвует'}
            </p>
            <p className={styles.tag}>
              <b>жанр</b>: {genres}
            </p>
            <p className={styles.tag}>
              <b>слоган</b>: {tagline || 'отсутсвует'}
            </p>

            <p className={styles.overview}>
              {overview || 'описание отсутствует'}
            </p>

            {trailer && !vError && (
              <Button
                variant="contained"
                color="secondary"
                target="_blank"
                startIcon={<YouTubeIcon />}
                className={styles.trailer}
                href={`https://youtube.com/watch?v=${trailer}`}
              >
                Tрейлер
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModalCard;
