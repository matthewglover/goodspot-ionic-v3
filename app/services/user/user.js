import {propEq, prop, isNil, complement, eq, not} from 'ramda';
import {USER_AUTHORISED, USER_PROFILE_LOADED} from '../../app-constants';


const isNotNil = complement(isNil);


const isAuthorisedEvent = propEq('eventType', USER_AUTHORISED);


const isProfileEvent = propEq('eventType', USER_PROFILE_LOADED);


export default class User {

  __gsAuthEventStream
  __profileStream

  __profile

  __userIdStream
  __userIdCache

  constructor({gsAuth}) {
    this.__gsAuthEventStream = gsAuth.eventStream;

    this._initProfileStream();

    this._reactToAuthenticatedEvents();
    this._reactToProfileLoadedEvents();
  }


  get profileStream() {
    return this.__profileStream;
  }


  get userIdStream() {
    if (isNil(this.__userIdCache)) {
      return this.__userIdStream;
    }

    return Rx.Observable
      .return(this.__userIdCache)
      .concat(this.__userIdStream);
  }


  // TODO: Deprecate and remove direct access: prefer userId event stream
  get userId() {
    return this.__userIdCache;
  }


  _initProfileStream() {
    this.__profileStream =
      this.__gsAuthEventStream
        .filter(isProfileEvent)
        .map(prop('profile'));
  }


  _reactToAuthenticatedEvents() {
    this.__userIdStream =
      this.__gsAuthEventStream
        .filter(isAuthorisedEvent)
        .map(prop('userId'))
        .filter(userId => not(eq(userId, this.__userIdCache)))
        .do(userId => this._cacheUserId(userId))
        .publish();

    this.__userIdStream.connect();
  }


  _reactToProfileLoadedEvents() {
    this.__profileStream
      .subscribe(profile => this._setProfile(profile));
  }


  _cacheUserId(userId) {
    //TODO: Implement any reset needed
    if (isNotNil(this.__userIdCache)) throw new Error('Change of user not yet implemented');

    this.__userIdCache = userId;
  }


  _setProfile(profile) {
    if (eq(profile, this.__profile)) return;

    //TODO: Implement any reset needed
    if (isNotNil(this.__profile)) throw new Error('Change of user not yet implemented');

    this.__profile = profile;
  }
}
