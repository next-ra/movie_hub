import styles from './Header.module.css';

const Header = () => {
  return (
    <header onClick={() => window.scroll(0, 0)} className={styles.header}>
      <h1>React Movies Hub</h1>
    </header>
  );
};

export default Header;
