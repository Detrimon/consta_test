import cn from 'classnames';
import styles from './Skin.module.css';

export const skin = (WrappedComponent: React.ComponentType) => () => {
  return (
    <div className={styles.container}>
      <div className={styles.figure_container}>
        <div className={cn(styles.back, styles.side)}></div>
        <div className={cn(styles.left, styles.side)}></div>
        <div className={cn(styles.right, styles.side)}></div>
        <div className={cn(styles.top, styles.side)}></div>
        <div className={cn(styles.bottom, styles.side)}></div>
        <div className={cn(styles.front, styles.side)}>
          <WrappedComponent />
        </div>
      </div>
    </div>
  );
};
