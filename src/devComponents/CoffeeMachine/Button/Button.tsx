import styles from './Button.module.css';
import { TButton } from '../types/types';
import cn from 'classnames';

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
  active = false,
  onClick = () => {},
  onMouseDown,
  onMouseUp,
}: TButton) => {
  const Icon = icons[icon];
  return (
    <button
      className={cn(styles.btn, {
        [styles.enabled]: active,
      })}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {Icon && <Icon enabled={active} size={iconSize} />}
    </button>
  );
};

export default Button;
