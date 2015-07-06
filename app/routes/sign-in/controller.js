import {USER_AUTHORISED} from '../../app-constants';

export default class SignInController {

  // constructor($log, gsActions) {
  //   this.__$log = $log;
  //   this.__gsActions = gsActions;
  //
  //   this.__$log.log('Initialising SignInController... Booom...');
  // }
  //
  //
  // signIn() {
  //   this.__$log.log('Signing in...');
  //   this.__gsActions.login();
  // }

  constructor($scope, auth, $state, store, gsUserEvents) {
    this.__auth = auth;
    this.__$state = $state;
    this.__store = store;
    this.__gsUserEvents = gsUserEvents;

    $scope.$on('$ionic.reconnectScope', ()=> {
      this._doAuth();
    });

    this._doAuth();
  }


  _doAuth() {
    this.__auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, (profile, idToken, accessToken, state, refreshToken) => {
      this.__gsUserEvents.raiseEvent(USER_AUTHORISED, {token: idToken, profile});
      this.__store.set('profile', profile);
      this.__store.set('token', idToken);
      this.__store.set('refreshToken', refreshToken);
      this.__$state.go('tab.dash');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
}
