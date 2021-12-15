import styles from './Error.module.css';
const Error = ({ error, modal }) => {
  const messageClass = modal ? styles[`modal-message`] : styles.msg;

  return (
    <div className={styles.box}>
      <h1 className={messageClass}>{error}</h1>
    </div>
  );
};

export default Error;
