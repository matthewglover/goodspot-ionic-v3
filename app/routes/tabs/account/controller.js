

const CONFIRM_SIGN_OUT_OPTIONS = {
  title: 'Sign out',
  template: 'Are you sure you want to sign out?'
};


export default class AccountController {

  __gsActions
  __$ionicPopup

  constructor(gsActions, $ionicPopup) {
    this.__gsActions = gsActions;
    this.__$ionicPopup = $ionicPopup;
  }


  startSignOut() {
    this.__$ionicPopup
      .confirm(CONFIRM_SIGN_OUT_OPTIONS)
      .then(res => res ? this.signOut() : null);
  }


  signOut() {
    this.__gsActions.logout();
  }
}
