import { useEffect, useState } from 'react';
import { baseUrl, key } from '../../../config/config';
import useDataApi from '../../../hooks/useDataApi ';
import useGenres from '../../../hooks/useGenres';
import Genres from '../../Genres/Genres';
import CustomPagination from '../../Pagination/CustomPagination';
import Preloader from '../../Preloader/Preloader';
import SingleContent from '../../SingleContent/SingleContent';
import Title from '../../UI/Title';
import Wrapper from '../../UI/Wrapper';
import NotFound from '../Search/NotFound';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreIds = useGenres(selectedGenres);

  const [{ data, isLoading: loading, isError: error, numOfPages }, doFetch] =
    useDataApi('Movies');

  useEffect(() => {
    doFetch(
      `${baseUrl}discover/movie?${key}&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIds}`,
    );
  });

  return (
    <div>
      <Title title="Фильмы" />
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setGenres={setGenres}
        genres={genres}
        setPage={setPage}
      />
      {numOfPages > 1 && !loading && !error && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numberOfPages={numOfPages}
        />
      )}
      {loading && <Preloader />}
      <Wrapper>
        {data &&
          !loading &&
          !error &&
          data.results?.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
        <NotFound />
      </Wrapper>
      {numOfPages > 1 && !loading && !error && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numberOfPages={numOfPages}
        />
      )}
    </div>
  );
};

export default Movies;
