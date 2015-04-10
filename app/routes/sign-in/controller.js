
export default class SignInController {

  constructor($log, gsActions) {
    this.__$log = $log;
    this.__gsActions = gsActions;

    this.__$log.log('Initialising SignInController...');
  }


  signIn() {
    this.__$log.log('Signing in...');
    this.__gsActions.login();
  }
}
