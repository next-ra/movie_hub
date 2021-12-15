import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, flag, type, blocked) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://api.themoviedb.org/3/${url}`);
        setData(data);
        setNumOfPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
    return () => {
      console.log(`unmounted: ${flag}`);
      setData([]);
      setNumOfPages(0);
    };
  }, [url, flag, type, blocked]);

  return { data, error, loading, numOfPages };
};

export default useFetch;
