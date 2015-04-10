import {is, complement, merge} from 'ramda';
import loginSuccessHandler from './login-success-handler';
import loginFailureHandler from './login-failure-handler';
import logoutHandler from './logout-handler';
import tokenGetter from './token-getter';


const isNotObject = complement(is(Object));
const isNotString = complement(is(String));

// AuthOptions: {defaultState: String, signinState: String}


// {auth0Provider, jwtInterceptorProvider, $httpProvider, gsPubSubProvider} -> AuthOptions -> undefined
const providerConfig = ({
    auth0Provider,
    jwtInterceptorProvider,
    $httpProvider,
    gsPubSubProvider,
    gsActionsProvider
  }) =>
  (options) => {
    // Validate options
    if (
      isNotObject(options) ||
      isNotString(options.defaultState) ||
      isNotString(options.loginState)
    ) {
      throw new TypeError('Invalid options defaultState and loginState required');
    }

    // Configure Auth0 provider
    auth0Provider.init(options);

    // Set event listeners
    auth0Provider.on('loginSuccess', loginSuccessHandler(options.defaultState));
    auth0Provider.on('loginFailure', loginFailureHandler);
    auth0Provider.on('logout', logoutHandler(options.loginState));

    // Set jwt interceptor token getter and add to http interceptors
    jwtInterceptorProvider.tokenGetter = tokenGetter;
    $httpProvider.interceptors.push('jwtInterceptor');
  };

export default providerConfig;
