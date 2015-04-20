import {propEq, prop, isNil, complement, eq} from 'ramda';
import {USER_AUTHORISED, USER_PROFILE_LOADED} from '../../app-constants';


const isNotNil = complement(isNil);


const isAuthorisedEvent = propEq('eventType', USER_AUTHORISED);


const isProfileEvent = propEq('eventType', USER_PROFILE_LOADED);


export default class User {

  __gsAuthEventStream
  __profileStream

  __userId
  __profile


  constructor({gsAuth}) {
    this.__gsAuthEventStream = gsAuth.eventStream;

    this._initProfileStream();

    this._reactToAuthenticatedEvents();
    this._reactToProfileLoadedEvents();
  }


  get profileStream() {
    return this.__profileStream;
  }


  get userId() {
    return this.__userId;
  }


  _initProfileStream() {
    this.__profileStream =
      this.__gsAuthEventStream
        .filter(isProfileEvent)
        .map(prop('profile'));
  }


  _reactToAuthenticatedEvents() {
    const authenticatedStream =
      this.__gsAuthEventStream
        .filter(isAuthorisedEvent)
        .map(prop('userId'));

    authenticatedStream
      .forEach(userId => this._setUserId(userId));
  }


  _reactToProfileLoadedEvents() {
    this.__profileStream.forEach(profile => this._setProfile(profile));
  }


  _setUserId(userId) {
    if (eq(userId, this.__userId)) return;

    //TODO: Implement any reset needed
    if (isNotNil(this.__userId)) throw new Error('Change of user not yet implemented');

    this.__userId = userId;
  }


  _setProfile(profile) {
    if (eq(profile, this.__profile)) return;

    //TODO: Implement any reset needed
    if (isNotNil(this.__profile)) throw new Error('Change of user not yet implemented');

    this.__profile = profile;
  }
}
