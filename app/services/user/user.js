import {propEq, prop} from 'ramda';
import {USER_AUTHORISED, USER_PROFILE_LOADED} from '../../app-constants';

const isAuthorisedEvent = propEq('eventType', USER_AUTHORISED);


const isProfileEvent = propEq('eventType', USER_PROFILE_LOADED);


export default class User {

  __gsAuthEventStream
  __profileStream
  __userIdStream


  constructor({gsAuth}) {
    this.__gsAuthEventStream = gsAuth.eventStream;

    this._initProfileStream();
    this._initUserIdStream();
  }


  get profileStream() {
    return this.__profileStream;
  }


  get userIdStream() {
    return this.__userIdStream;
  }


  _initProfileStream() {
    this.__profileStream =
      this.__gsAuthEventStream
        .filter(isProfileEvent)
        .map(prop('profile'))
        .replay(1);

    this.__profileStream.connect();
  }


  _initUserIdStream() {
    this.__userIdStream =
      this.__gsAuthEventStream
        .filter(isAuthorisedEvent)
        .map(prop('userId'))
        .replay(1);

    this.__userIdStream.connect();
  }
}
