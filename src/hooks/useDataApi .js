import axios from 'axios';
import { useEffect, useState } from 'react';

const useDataApi = () => {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      if (!url) {
        return;
      }
      setIsError(false);
      setIsLoading(true);

      try {
        const { data } = await axios.get(url);

        if (isActive) {
          setData(data);
          setNumOfPages(data.total_pages || 0);
        }
      } catch (error) {
        setIsError(
          error?.response?.data?.status_message || 'Что-то пошло не так!',
        );
      }

      setIsLoading(false);
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [url]);

  return [
    { data, numOfPages, isLoading, isError },
    setUrl,
    setData,
    setNumOfPages,
  ];
};

export default useDataApi;
