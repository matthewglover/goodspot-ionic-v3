import template from './index.html';
import SignInController from './controller';


const SIGN_IN_ROUTE_CONFIG = {
  url: '/sign-in',
  template,
  controller: 'SignInController as ctrl'
};


const configSignInRoute = ($stateProvider) =>
  $stateProvider.state('sign-in', SIGN_IN_ROUTE_CONFIG);


export default (ngModule) => {

  ngModule.config(configSignInRoute);

  ngModule.controller('SignInController', SignInController);
};
