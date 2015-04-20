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


const configAuth = (gsAuthProvider) => gsAuthProvider.config(authConfig);


const runAuth = (gsAuth) => gsAuth.init();


export default (ngModule) => {
  ngModule.config(configAuth);
  ngModule.run(runAuth)
};
