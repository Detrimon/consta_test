import App from './components/app/App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import { store } from './redux/store';
import CheckConfigurationLayout from './layouts/CheckConfigurationLayout';

import KeycloakProvider from './layouts/keycloakProvider/KeycloakProvider';

ReactDOM.render(
  <CheckConfigurationLayout>
    <KeycloakProvider>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </KeycloakProvider>
  </CheckConfigurationLayout>,
  document.getElementById('root')
);
