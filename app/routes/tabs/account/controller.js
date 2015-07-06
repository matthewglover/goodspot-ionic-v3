import {LOGOUT} from '../../../app-constants';

const CONFIRM_SIGN_OUT_OPTIONS = {
  title: 'Sign out',
  template: 'Are you sure you want to sign out?'
};


export default class AccountController {

  __gsUserEvents
  __$ionicPopup

  constructor(gsUserEvents, $ionicPopup) {
    this.__gsUserEvents = gsUserEvents;
    this.__$ionicPopup = $ionicPopup;
  }


  startSignOut() {
    this.__$ionicPopup
      .confirm(CONFIRM_SIGN_OUT_OPTIONS)
      .then(res => res ? this.signOut() : null);
  }


  signOut() {
    this.__gsUserEvents.raiseEvent(LOGOUT);
  }
}
