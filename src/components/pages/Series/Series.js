import { useEffect, useState } from 'react';
import { baseUrl, key } from '../../../config/config';
import useDataApi from '../../../hooks/useDataApi ';
import useGenres from '../../../hooks/useGenres';
import Error from '../../Error/Error';
import Genres from '../../Genres/Genres';
import CustomPagination from '../../Pagination/CustomPagination';
import Preloader from '../../Preloader/Preloader';
import SingleContent from '../../SingleContent/SingleContent';
import Title from '../../UI/Title';
import Wrapper from '../../UI/Wrapper';
import NotFound from '../Search/NotFound';

const Series = () => {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreIds = useGenres(selectedGenres);

  const [{ data, isLoading: loading, isError: error, numOfPages }, doFetch] =
    useDataApi('Series');

  useEffect(() => {
    doFetch(
      `${baseUrl}discover/tv?${key}&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIds}`,
    );
  });

  return (
    <div>
      <Title title="Сериалы" />
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setGenres={setGenres}
        genres={genres}
        setPage={setPage}
      />

      <Wrapper>
        {loading && <Preloader />}
        {error && <Error />}
        {data &&
          !loading &&
          data.results?.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
        <NotFound
          isLoading={loading}
          results={data.total_results}
          error={error}
        />
      </Wrapper>

      {!loading && numOfPages > 1 && !error && (
        <CustomPagination
          numberOfPages={numOfPages}
          setPage={setPage}
          page={page}
        />
      )}
    </div>
  );
};

export default Series;
