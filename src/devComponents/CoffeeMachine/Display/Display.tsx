import { Spin } from 'antd';
import { CoffeeMachineContextConsumer } from '../context/context';
import cn from 'classnames';
import styles from './Display.module.css';

const Display = () => {
  return (
    <div className={styles.item_display}>
      <CoffeeMachineContextConsumer>
        {({ isSwitchOn, isActionInProcess, displayValue }) => (
          <div
            className={cn(styles.display_container, {
              [styles.display_container_active]: isSwitchOn,
            })}
          >
            <div
              className={cn(styles.display_loader, {
                [styles.display_loader_active]: isActionInProcess,
              })}
            >
              <Spin />
            </div>
            {displayValue}
          </div>
        )}
      </CoffeeMachineContextConsumer>
    </div>
  );
};

export default Display;
