const {
  REACT_APP_KEYCLOAK_URL,
  REACT_APP_KEYCLOAK_REALM,
  REACT_APP_KEYCLOAK_CLIENT_ID,
  REACT_APP_KEYCLOAK_ONLOAD_ACTION,
  REACT_APP_KEYCLOAK_SILENT_CHECK_SSO_REDIRECT_URI,
  REACT_APP_BASE_DATA_API_URL,
} = process.env;

export const isEnvConfigIncomplete = [
  REACT_APP_KEYCLOAK_URL,
  REACT_APP_KEYCLOAK_REALM,
  REACT_APP_KEYCLOAK_CLIENT_ID,
  REACT_APP_KEYCLOAK_ONLOAD_ACTION,
  REACT_APP_BASE_DATA_API_URL,
  REACT_APP_KEYCLOAK_ONLOAD_ACTION === 'check-sso'
    ? REACT_APP_KEYCLOAK_SILENT_CHECK_SSO_REDIRECT_URI
    : 'dummy',
].some((item) => item === undefined || item === null || item === '');

export const initKeycloakParams = {
  url: REACT_APP_KEYCLOAK_URL, //'http://localhost:8080/auth/',
  realm: REACT_APP_KEYCLOAK_REALM, //'KeyCloakApp',
  clientId: REACT_APP_KEYCLOAK_CLIENT_ID, //'consta',
};

export const keycloakConfig = {
  onLoad: REACT_APP_KEYCLOAK_ONLOAD_ACTION, //'login-required',
};

export const baseDataAPIUrl = REACT_APP_BASE_DATA_API_URL;
