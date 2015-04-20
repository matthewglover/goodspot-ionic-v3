import authEventStream from './auth-event-stream';
import {USER_DEAUTHORISED} from '../../app-constants';

const logoutHandler = (loginState) =>
  /* ngInject */
  ($state) => {
    $state.go(loginState);
    authEventStream.onNext({eventType: USER_DEAUTHORISED});
  }


export default logoutHandler;
