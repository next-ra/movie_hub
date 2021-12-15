import { useEffect, useState } from 'react';

import Error from '../../Error/Error';
import CustomPagination from '../../Pagination/CustomPagination';
import Preloader from '../../Preloader/Preloader';
import SingleContent from '../../SingleContent/SingleContent';

import { baseUrl, key } from '../../../config/config';
import Wrapper from '../../UI/Wrapper';
import Title from '../../UI/Title';
import useDataApi from '../../../hooks/useDataApi ';
const Trending = () => {
  const [page, setPage] = useState(1);

  const [{ data, isLoading, isError }, setUrl] = useDataApi();

  useEffect(() => {
    setUrl(`${baseUrl}trending/all/day?${key}&language=ru&page=${page}`);
  }, [setUrl, page]);

  return (
    <div>
      <Title title="В тренде" />
      {!isError && <CustomPagination setPage={setPage} page={page} />}
      {isError && <Error error={isError} />}
      <Wrapper>
        {isLoading && <Preloader />}

        {data &&
          !isLoading &&
          data.results?.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </Wrapper>
      {!isError && !isLoading && data && (
        <CustomPagination setPage={setPage} page={page} />
      )}
    </div>
  );
};

export default Trending;
