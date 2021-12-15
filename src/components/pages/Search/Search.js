import SearchIcon from '@mui/icons-material/Search';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { baseUrl, key } from '../../../config/config';
import useDataApi from '../../../hooks/useDataApi ';
import Error from '../../Error/Error';

import CustomPagination from '../../Pagination/CustomPagination';
import Preloader from '../../Preloader/Preloader';
import SingleContent from '../../SingleContent/SingleContent';
import Wrapper from '../../UI/Wrapper';
import NotFound from './NotFound';
import styles from './Search.module.css';

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [searchDisabled, setSearchDisabled] = useState(true); // предотавращяет запрос при первом рендере и при пустой строке

  const [
    { data, isLoading, isError, numOfPages },
    doFetch,
    setData,
    setNumOfPages,
  ] = useDataApi('SEARCH');

  const getUrl = useCallback(
    (query) => {
      return `${baseUrl}search/${
        type ? 'tv' : 'movie'
      }?${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    },
    [page, type],
  );
  console.log(data);
  const items = data?.results?.map((c) => (
    <SingleContent
      key={c.id}
      id={c.id}
      poster={c.poster_path}
      title={c.title || c.name}
      date={c.first_air_date || c.release_date}
      media_type={type ? 'tv' : 'movie'}
      vote_average={c.vote_average}
    />
  ));

  const changeTypeHandler = (e, value) => {
    setSearchDisabled(true);
    setType(value);
    setPage(1);
    setData([]);
    setCurrentQuery('');
    setInputValue('');
    setNumOfPages(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setCurrentQuery(inputValue);
    doFetch(getUrl(inputValue));
    setInputValue('');
    setSearchDisabled(false);
  };

  useEffect(() => {
    !searchDisabled && doFetch(getUrl(currentQuery));
  }, [currentQuery, doFetch, getUrl, searchDisabled]);

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setIsBtnDisabled(true);
    } else setIsBtnDisabled(false);
  }, [inputValue]);

  const searchHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <form className={styles.search} onSubmit={onSubmit}>
        <TextField
          sx={{ flex: 1 }}
          className={styles['search-box']}
          label="Поиск"
          variant="outlined"
          onChange={searchHandler}
          value={inputValue}
        />
        <Button
          type="submit"
          disabled={isBtnDisabled}
          variant="outlined"
          sx={{ ml: '10px' }}
        >
          <SearchIcon />
        </Button>
      </form>

      <Tabs
        value={type}
        className={styles.tabs}
        textColor="secondary"
        indicatorColor="secondary"
        onChange={changeTypeHandler}
      >
        <Tab sx={{ width: '50%' }} label="Поиск фильмов" />
        <Tab sx={{ width: '50%' }} label="Поиск Сериалов" />
      </Tabs>

      {numOfPages > 1 && !isLoading && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numberOfPages={numOfPages}
        />
      )}

      <Wrapper>
        {isLoading && <Preloader />}
        <NotFound
          isLoading={isLoading}
          query={currentQuery}
          results={data.total_results}
          error={isError}
        />
        {isError && <Error error={isError} />}
        {!isLoading && !isError && items}
      </Wrapper>
      {numOfPages > 1 && !isLoading && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numberOfPages={numOfPages}
        />
      )}
    </>
  );
};

export default React.memo(Search);
