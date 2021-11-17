import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { ThemePreset } from '@consta/uikit/Theme';
import styles from './App.module.css';
import 'antd/dist/antd.css';

import MyBreadcrumbs from '../../navComponents/MyBreadcrumbs';

import navigationMap from '../../navigationData/navigationMap';
import MyThemeToggler from '../../serviceComponents/MyThemeToggler';
// import { TMyTogglerPropSet } from '../../serviceComponents/MyThemeToggler';

type TThemeOnChange = {
  value: ThemePreset;
  setThemePreset: React.Dispatch<React.SetStateAction<ThemePreset>>;
};

const themeToggler = {
  onChange: ({ value, setThemePreset }: TThemeOnChange) =>
    setThemePreset(value),
};

const App = () => {
  const [themePreset, setThemePreset] = useState(presetGpnDefault);
  const routes = navigationMap.map((item, index) => {
    const CustomComponent: any = item.component;
    return (
      <Route exact path={item.path} key={index}>
        <CustomComponent {...item.attributes} />
      </Route>
    );
  });

  return (
    <Theme preset={themePreset} className={styles.base}>
      <div className={styles.container}>
        <MyThemeToggler
          onChange={({ value }: { value: ThemePreset }) =>
            themeToggler.onChange({ value, setThemePreset })
          }
          currentThemePreset={themePreset}
        />
        <MyBreadcrumbs />
        <Switch>
          {routes}
          <Redirect to="/" />
        </Switch>
      </div>
    </Theme>
  );
};

export default App;
