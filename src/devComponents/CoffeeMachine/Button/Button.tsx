import styles from './Button.module.css';
import { TButton } from '../types/types';
import cn from 'classnames';

import { CoffeeMachineContextConsumer } from '../context/context';

import PowerIcon from '../icons/PowerIcon';
import CupOfCoffeeIcon from '../icons/CupOfCoffeeIcon';
import DoubleCoffeeIcon from '../icons/DoubleCoffeeIcon';
import FillWaterIcon from '../icons/FillWaterIcon';
import ClearIcon from '../icons/ClearIcon';

const icons = {
  power: PowerIcon,
  cupOfCoffee: CupOfCoffeeIcon,
  doubleCoffee: DoubleCoffeeIcon,
  fillWater: FillWaterIcon,
  clear: ClearIcon,
};

export type TIcons = keyof typeof icons;

const Button = ({
  icon,
  iconSize = 'm',
  onClick = () => {},
  onMouseDown,
  onMouseUp,
}: TButton) => {
  const Icon = icons[icon];
  return (
    <CoffeeMachineContextConsumer>
      {({ isSwitchOn }) => (
        <button
          className={cn(styles.btn, {
            [styles.enabled]: isSwitchOn,
          })}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {Icon && <Icon enabled={isSwitchOn} size={iconSize} />}
        </button>
      )}
    </CoffeeMachineContextConsumer>
  );
};

export default Button;
