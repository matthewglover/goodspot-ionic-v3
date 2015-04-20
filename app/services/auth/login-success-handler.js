import authEventStream from './auth-event-stream';
import {USER_AUTHORISED, USER_PROFILE_LOADED} from '../../app-constants';

const getUserIdFromToken =
  (jwtHelper, idToken) =>  jwtHelper.decodeToken(idToken).sub;


const loginSuccessHandler = (defaultState) =>
  /* @ngInject */
  ($state, profilePromise, idToken, refreshToken, store, jwtHelper, gsPubSub, auth) => {
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);

    // gsPubSub.publish('gsAuth', 'userAuthorised', getUserIdFromToken(jwtHelper, idToken));
    authEventStream.onNext({
      eventType: USER_AUTHORISED,
      userId: getUserIdFromToken(jwtHelper, idToken)
    });

    profilePromise.then((profile) => {
      store.set('profile', profile);
      // gsPubSub.publish('gsAuth', 'userProfileLoaded', profile);
      authEventStream.onNext({eventType: USER_PROFILE_LOADED, profile});
    });

    $state.go(defaultState);
  };


export default loginSuccessHandler;
