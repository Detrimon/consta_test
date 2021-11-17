import { FunctionComponent } from 'react';
import Loader from '../../components/Loader';

// @ts-ignore
import initKeycloak from 'keycloak-js';
// @ts-ignore
import { ReactKeycloakProvider as SourceKeycloakProvider } from '@react-keycloak/web';

import { initKeycloakParams, keycloakConfig } from '../../constants/env';

// @ts-ignore
export const keycloak = new initKeycloak(initKeycloakParams);

const KeycloakProvider: FunctionComponent = ({ children }) => (
  <SourceKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakConfig}
    LoadingComponent={<Loader />}
    isLoadingCheck={(keycloak: any) => !keycloak.authenticated}
  >
    {children}
  </SourceKeycloakProvider>
);

export default KeycloakProvider;
