import {LOGOUT} from '../../app-constants';

export default class LogoutEventListener {

  __gsUserEvents
  __auth

  constructor(gsUserEvents, auth, store, $state) {
    this.__gsUserEvents = gsUserEvents;
    this.__auth = auth;
    this.__store = store;
    this.__$state = $state;

    this._initLogoutListener();
  }


  _initLogoutListener() {
    this.__gsUserEvents
      .getEventStream(LOGOUT)
      .subscribe(() => this._doLogout());
  }


  _doLogout() {
    this.__auth.signout();
    this.__store.remove('token');
    this.__store.remove('profile');
    this.__store.remove('refreshToken');
    this.__$state.go('sign-in', {}, {reload: true});
  }
}
