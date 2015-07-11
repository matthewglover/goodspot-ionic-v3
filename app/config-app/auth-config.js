import {USER_AUTHORISED} from '../app-constants';

export const configAuth = (authProvider, jwtInterceptorProvider, $httpProvider) => {

  authProvider.init({
    domain: 'goodspot.auth0.com',
    clientID: 'lZyNKkZe4IwAC9XdDLNJCQCxtO0YtpLp',
    loginState: 'sign-in'
  });


  jwtInterceptorProvider.tokenGetter = (store, jwtHelper, auth) => {
    const idToken = store.get('token');
    const refreshToken = store.get('refreshToken');

    if (!idToken || !refreshToken) {
     return null;
    }

    if (jwtHelper.isTokenExpired(idToken)) {
     return auth.refreshIdToken(refreshToken)
       .then(function(idToken) {
         store.set('token', idToken);
         return idToken;
       });
    } else {
      return idToken;
    }
  }


  $httpProvider.interceptors.push('jwtInterceptor');
};


export const initAuth = ($rootScope, auth, store, gsUserEvents) => {
  $rootScope.$on('$locationChangeStart', () => {
    if (auth.isAuthenticated) {
      return;
    }

    const token = store.get('token');

    if (token) {
      const profile = store.get('profile');
      auth.authenticate(profile, token);
      gsUserEvents.raiseEvent(USER_AUTHORISED, {token, profile});
    } else {
      console.log('Oh no where\'s the token?');
    }
  });
};
