import Auth from './auth';
import {LOGIN, LOGOUT} from '../../app-constants';


// _ -> Service
const authFactory = ($state, $rootScope, auth, store, jwtHelper, gsPubSub, gsDispatcher) => {

  const objAuth = new Auth({$state, $rootScope, auth, store, jwtHelper, gsPubSub});

  gsDispatcher.register((payload) => {

    switch (payload.actionType) {

      case LOGIN :
        objAuth.facebookLogin();
        break;

      case LOGOUT :
        objAuth.logout();
        break;
    }
  });


  return objAuth;
};


export default authFactory;
