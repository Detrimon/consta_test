import { TIcons } from '../Button/Button';

export type TButton = {
  icon: TIcons;
  iconSize?: 'xs' | 's' | 'm';
  active?: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
