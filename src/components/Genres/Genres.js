import { Chip } from '@mui/material';
import { useEffect } from 'react';
import { baseUrl, key } from '../../config/config';
import useDataApi from '../../hooks/useDataApi ';
import styles from './Genres.module.css';

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  setGenres,
  genres,
  setPage,
}) => {
  const [{ data }, doFetch] = useDataApi('genres');

  useEffect(() => {
    doFetch(`${baseUrl}genre/${type}/list?${key}&language=ru`);
    setGenres(data.genres);
    return () => {
      setGenres([]);
    };
  }, [doFetch, setGenres, type, data.genres]);

  const addHandler = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const removeHandler = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  return (
    <div className={styles.box}>
      {selectedGenres &&
        selectedGenres.map((g) => (
          <Chip
            key={g.id}
            size="small"
            color="secondary"
            clickable
            label={g.name}
            sx={{ m: 0.3 }}
            onDelete={() => removeHandler(g)}
            onClick={() => {
              removeHandler(g);
            }}
          />
        ))}
      {genres &&
        genres.map((g) => (
          <Chip
            key={g.id}
            size="small"
            variant="outlined"
            clickable
            label={g.name}
            sx={{ m: 0.3 }}
            onClick={() => addHandler(g)}
          />
        ))}
    </div>
  );
};

export default Genres;
