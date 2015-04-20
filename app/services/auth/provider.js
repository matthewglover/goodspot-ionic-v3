import providerConfig from './provider-config';
import authFactory from './auth-factory';


// Provider, Provider, Provider -> Provider
const gsAuthProvider = (
  authProvider,
  jwtInterceptorProvider,
  $httpProvider,
  gsPubSubProvider,
  gsActionsProvider) => {

  return {
    config: providerConfig({
      auth0Provider: authProvider,
      jwtInterceptorProvider,
      $httpProvider,
      gsPubSubProvider,
      gsActionsProvider
    }),
    $get: authFactory
  };
};


export default gsAuthProvider;
