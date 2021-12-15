import styles from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={styles.box} id="preloader">
      <div className={styles.loader} id="loader">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;
