import styles from './CardTitle.module.css';

const CardTitle = ({ title, originalTitle, year }) => {
  return (
    <div className={styles[`title-container`]}>
      <h1 className={styles.title}>
        {title}&nbsp;({year})
      </h1>
      <h3 className={styles[`orginal-title`]}>{originalTitle}</h3>
    </div>
  );
};

export default CardTitle;
