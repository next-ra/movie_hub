import Pagination from '@mui/material/Pagination';
import styles from './CustomPagination.module.css';

const CustomPagination = ({ setPage, page, numberOfPages = 10 }) => {
  const pageChangeHandler = (e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        onChange={pageChangeHandler}
        count={numberOfPages > 500 ? 500 : numberOfPages}
        shape="rounded"
        size="small"
        color="secondary"
        page={page}
      />
    </div>
  );
};

export default CustomPagination;
