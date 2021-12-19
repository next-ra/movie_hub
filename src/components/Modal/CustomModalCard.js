import { Button } from '@mui/material';
import styles from './CustomModalCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Error from '../Error/Error';
import CardImage from './Card/CardImage';
import Tags from './Card/Tags';
import CardTitle from './Card/CardTitle';
import useMediaQuery from '../../hooks/UseMediaQuery';

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

  const tablet = useMediaQuery(750);
  const mobile = useMediaQuery(750, 549);

  let src = mobile ? poster : tablet ? backdrop : poster;

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

      {(!tablet || mobile) && <CardImage src={src} title={title} />}

      {error && <Error error={error} modal />}

      {!error && (
        <div className={styles.box}>
          {tablet && !mobile && <CardImage src={src} title={title} />}

          <CardTitle title={title} originalTitle={originalTitle} year={year} />
          <Tags vote_average={vote_average} genres={genres} tagline={tagline} />

          <p className={styles.overview}>
            {overview || 'описание отсутствует'}
          </p>

          {trailer && !vError && (
            <Button
              sx={{ maxWidth: 120, ml: '0.7vw', mb: '0.7vw' }}
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
  );
};

export default CustomModalCard;
