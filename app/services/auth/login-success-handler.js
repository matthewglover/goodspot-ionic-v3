

const getUserIdFromToken =
  (jwtHelper, idToken) =>  jwtHelper.decodeToken(idToken).sub;


const loginSuccessHandler = (defaultState) =>
  /* @ngInject */
  ($state, profilePromise, idToken, refreshToken, store, jwtHelper, gsPubSub, auth) => {
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);

    gsPubSub.publish('gsAuth', 'userAuthorised', getUserIdFromToken(jwtHelper, idToken));

    profilePromise.then((profile) => {
      store.set('profile', profile);
      gsPubSub.publish('gsAuth', 'userProfileLoaded', profile);
    });

    $state.go(defaultState);
  };


export default loginSuccessHandler;
