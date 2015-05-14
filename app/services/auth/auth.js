import {isNil} from 'ramda';
import onLocationChangeStartListener from './on-location-change-start-listener';
import authEventStream from './auth-event-stream';
import {USER_AUTHORISED, USER_PROFILE_LOADED} from '../../app-constants';


class Auth {

  constructor({$state, $rootScope, auth, store, jwtHelper, gsPubSub}) {
    this.__$state = $state;
    this.__$rootScope = $rootScope;
    this.__auth = auth;
    this.__store = store;
    this.__jwtHelper = jwtHelper;
    this.__gsPubSub = gsPubSub;
  }


  get eventStream() {
    return authEventStream;
  }


  get USER_AUTHORISED() {
    return USER_AUTHORISED;
  }


  get USER_PROFILE_LOADED() {
    return USER_PROFILE_LOADED;
  }


  init() {
    this.__auth.hookEvents();
    this._setFirstLoadListener();
  }


  facebookLogin() {
    this.__$rootScope.$broadcast('loading:show');
    this.__auth.signin({
      connection: 'facebook',
      authParams: {
        scope: 'openid offline_access',
        device: 'Chrome browser'
      }
    });
  }


  logout() {
    this._clearToken();
    this.__auth.signout();
    this.__gsPubSub.publish('goodspotAuth', 'signedOut');
  }


  isNoToken() {
    return isNil(this.token);
  }


  isValidToken() {
    return !this.__jwtHelper.isTokenExpired(this.token);
  }


  authenticate() {
    this.__auth.authenticate(this.profile, this.token);

    // this.__gsPubSub.publish('goodspotAuth', 'userAuthorised', this.userId);
    // this.__gsPubSub.publish('goodspotAuth', 'profileLoaded', this.profile);
    authEventStream.onNext({
      eventType: USER_AUTHORISED,
      userId: this.userId
    });

    authEventStream.onNext({eventType: USER_PROFILE_LOADED, profile: this.profile});
  }


  refreshAndAuthenticate() {
    return this.__auth.refreshIdToken(this.refreshToken)
      .then((token) => {
        // CHECK - MAYBE A BUG WITH THIS REFERENCE - this.__auth or this?
        this.token = token;
        this.authenticate();
      });
  }


  get profile() {
    // return this.__auth.profile;
    return this.__store.get('profile')
  }


  get token() {
    return this.__store.get('token');
  }


  set token(token) {
    return this.__store.set('token', token);
  }


  get refreshToken() {
    return this.__store.get('refreshToken');
  }


  get isAuthenticated() {
    return this.__auth.isAuthenticated;
  }


  get userId() {
    return this.__jwtHelper.decodeToken(this.token).sub;
  }


  _setFirstLoadListener() {
    // Register listener: n.b. event only fires on refresh/first page visit
    this.__$rootScope.$on('$locationChangeStart', onLocationChangeStartListener(this));
  }


  _clearToken() {
    this.__store.remove('token');
    this.__store.remove('profile');
    this.__store.remove('refreshToken');
  }
}


export default Auth;
