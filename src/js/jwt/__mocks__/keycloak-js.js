import cookie from 'js-cookie';
import { data as encodedToken } from '../../../../testdata/encodedToken.json';

/* eslint-disable camelcase */
const Keycloak = (options) => {
  let scope = options.scope || 'online';
  let token = encodedToken;
  let tokenParsed = options.tokenParsed;
  let refreshToken = encodedToken;
  let redirectUri = options.redirectUri;
  return {
    callback_id: 0,
    authenticated: false,
    useNativePromise: true,
    responseMode: 'fragment',
    responseType: 'code',
    flow: 'standard',
    clientId: 'cloud-services',
    authServerUrl: 'https://sso.qa.redhat.com/auth',
    realm: 'redhat-external',
    endpoints: {},
    redirectUri,
    token,
    tokenParsed,
    refreshToken,
    scope,
    init: (options) => {
      return Promise.resolve(options);
    },
    login: (data) => {
      redirectUri = data.redirectUri;
      cookie.set('cs_jwt', 'token1');
    },
    updateToken: () => {
      return new Promise((res) => {
        cookie.remove('cs_jwt');
        cookie.set('cs_jwt', 'updatedToken');
        return res(true);
      });
    },
    clearToken: () => {
      cookie.remove('cs_jwt');
    },
    logout: () => {
      cookie.remove('cs_jwt');
    },
  };
};
/* eslint-enable camelcase */

export default Keycloak;
