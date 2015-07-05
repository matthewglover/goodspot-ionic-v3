import {auth0Config} from '../config';
import {merge} from 'ramda';


const authConfig = merge(
  {
    callbackURL: location.href,
    defaultState: 'tab.dash',
    loginState: 'sign-in'
  },
  auth0Config
);


export const configAuth = (gsAuthProvider) => {
  console.log('configuring auth..');
  gsAuthProvider.config(authConfig);
}


export const initAuth = (gsAuth) => {
  console.log('initialising auth..');
  gsAuth.init();
}
