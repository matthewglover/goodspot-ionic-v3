// import {propEq, prop} from 'ramda';
import {USER_AUTHORISED} from '../../app-constants';


const getUserIdFromToken =
  (jwtHelper, token) =>  jwtHelper.decodeToken(token).sub;

export default class User {

  __userIdStream


  constructor(gsUserEvents, jwtHelper) {

    this.__userIdStream =
      gsUserEvents
        .getEventStream(USER_AUTHORISED)
        .map(({token}) => getUserIdFromToken(jwtHelper, token))
        .replay(1);

    this.__userIdStream.connect();
  }


  get userIdStream() {
    return this.__userIdStream;
  }
}
