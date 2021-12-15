import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { baseUrl, img_500, key, unavailable } from '../../config/config';
import useDataApi from '../../hooks/useDataApi ';
import Carousel from '../Carousel/Carousel';
import styles from './CustomModal.module.css';
import CustomModalCard from './CustomModalCard';

export default function CustomModal({ media_type, id }) {
  const [open, setOpen] = useState(false);

  const [{ data, isError: error }, fetchInfo, setData] =
    useDataApi('Сustom Modal Info');

  useEffect(() => {
    let isActive = true;
    isActive && fetchInfo(`${baseUrl}${media_type}/${id}?${key}&language=ru`);
    return () => {
      isActive = false;
    };
  }, [fetchInfo, setData, media_type, id]);

  const [{ data: trailer, isError: vError }, fetchTrailer] =
    useDataApi('Сustom Modal видео');

  useEffect(() => {
    let isActive = true;
    isActive &&
      fetchTrailer(`${baseUrl}${media_type}/${id}/videos?${key}&language=eng`);
    return () => {
      isActive = false;
    };
  }, [fetchTrailer, media_type, id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cardConfig = {
    handleClose,
    title: data.name || data.title,
    poster: data.poster_path ? `${img_500}/${data.poster_path}` : unavailable,
    backdrop: data.poster_path
      ? `${img_500}/${data.backdrop_path}`
      : unavailable,
    year: (data.first_air_date || data.release_date || '____').substring(0, 4),
    originalTitle: data.original_name || data.original_title,
    vote_average: data.vote_average,
    genres: data.genres?.map((g) => g.name).join(', '),
    tagline: data.tagline,
    overview: data.overview,
    trailer: trailer.results && trailer.results[0]?.key,
    error,
    vError,
  };

  return (
    <div>
      <Button
        sx={{ textTransform: 'none' }}
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        Подробнее
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles.wrapper}>
            <CustomModalCard config={cardConfig} />
            <div className={styles.slider}>
              <Carousel media_type={media_type} id={id} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
