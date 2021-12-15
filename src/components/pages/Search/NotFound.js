const NotFound = ({ query = 1, isLoading, results, error }) => {
  return (
    query &&
    !isLoading &&
    !error &&
    results === 0 && (
      <h2 style={{ color: 'orange', marginTop: '5vw' }}>
        По запросу ничего не найдено
      </h2>
    )
  );
};

export default NotFound;
