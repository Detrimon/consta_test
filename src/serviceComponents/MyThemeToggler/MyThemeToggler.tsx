import { ThemeToggler, ThemePropSetValue } from '@consta/uikit/ThemeToggler';
import { IconSun } from '@consta/uikit/IconSun';
import { IconMoon } from '@consta/uikit/IconMoon';
import styles from './MyThemeToggler.module.css';
import {
  ThemePreset,
  presetGpnDefault,
  presetGpnDark,
} from '@consta/uikit/Theme';

const themePresets = [presetGpnDefault, presetGpnDark];

export type TMyTogglerPropSet = {
  onChange: ThemePropSetValue<ThemePreset>;
  currentThemePreset: ThemePreset;
};

const MyThemeToggler = ({
  onChange,
  currentThemePreset,
}: TMyTogglerPropSet) => {
  return (
    <div className={styles.container}>
      <ThemeToggler
        size="m"
        items={themePresets}
        value={currentThemePreset}
        onChange={onChange}
        getItemIcon={(theme) => {
          return theme.color.primary === 'gpnDefault' ? IconSun : IconMoon;
        }}
        getItemLabel={(theme) => {
          return theme.color.primary;
        }}
      />
    </div>
  );
};

export default MyThemeToggler;
