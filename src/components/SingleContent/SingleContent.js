import { Badge } from '@mui/material';
import { img_300, unavailable } from '../../config/config';
import CustomModal from '../Modal/CustomModal';
import styles from './SingleContent.module.css';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const color =
    vote_average === 0 ? 'error' : vote_average > 7 ? 'success' : 'warning';

  return (
    <>
      <div className={styles.card}>
        <Badge
          sx={{
            '&  .MuiBadge-badge ': {
              borderRadius: `4px`,
              top: 15,
              right: 30,
              minWidth: '45px',
              textAlign: `center`,
            },
          }}
          badgeContent={vote_average || '¯(º_o)/¯'}
          color={color}
        />
        <img
          className={styles.poster}
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <div className={styles.info}>
          <h4>{title}</h4>
          <span> {date?.split('-').reverse().join('.')}</span>
          <span style={{ fontStyle: `italic`, color: 'gray' }}>
            {media_type === 'tv' ? 'Сериал' : 'Фильм'}
          </span>{' '}
          <CustomModal media_type={media_type} id={id} />
        </div>
      </div>
    </>
  );
};

export default SingleContent;
