import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { baseUrl, img_300, key, noPicture } from '../../config/config';
import useDataApi from '../../hooks/useDataApi ';

import styles from './Carousel.module.css';
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [{ data }, doFetch] = useDataApi('карусель');

  useEffect(() => {
    let isActive = true;
    if (isActive)
      doFetch(`${baseUrl}${media_type}/${id}/credits?${key}&language=ru`);
    return () => {
      isActive = false;
    };
  }, [doFetch, media_type, id]);

  const items = data.cast?.map((c) => (
    <div className={styles.item}>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className={styles.img}
      />
      <b className={styles.name}>{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
    1400: {
      items: 10,
    },
  };

  return (
    <AliceCarousel
      responsive={responsive}
      autoPlay
      autoPlayInterval={2500}
      mouseTracking
      infinite
      disableButtonsControls
      disableDotsControls
      items={items}
    />
  );
};
export default Carousel;
