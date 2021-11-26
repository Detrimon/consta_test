import styles from './Separator.module.css';
const Separator = ({ width = 10 }) => {
  return (
    <span className={styles.container} style={{ width: `${width}px` }}></span>
  );
};

export default Separator;
