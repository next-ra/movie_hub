import axios from 'axios';
import { useEffect, useState } from 'react';

const useMovieDbApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const { data } = await axios.get(url);

        setData(data);
      } catch (error) {
        setIsError(error.message || 'ошибка');
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useMovieDbApi;
