import Rx from 'rxjs/dist/rx.lite';
import {propEq, pick} from 'ramda';


export default class UserLocations {

  __gsGoodspotApi
  __userIdStream

  __userIdCache

  __gsLocationCreateEventListener

  __locationStream

  constructor({gsGoodspotApi, gsUser, gsLocationCreateEventListener}) {
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsLocationCreateEventListener = gsLocationCreateEventListener;

    this._initOnLocationCreatedStream(gsLocationCreateEventListener.eventStream);
    this._initUserId(gsUser.userIdStream);
    this._initLocationStream();
  }


  get locationStream() {
    return this.__locationStream;
  }

  get __CREATE_LOCATION() {
    return this.__gsLocationCreateEventListener.CREATE_LOCATION;
  }


  get __LOCATION_CREATED() {
    return this.__gsLocationCreateEventListener.LOCATION_CREATED;
  }

  _search(userId) {
    return this.__gsGoodspotApi.getPersonLocations(userId);
  }


  _initUserId(userIdStream) {
    this.__userIdStream =
      userIdStream
        .do(userId => this.__userIdCache = userId);
  }


  _initLocationStream() {
    this.__locationStream =
      this.__userIdStream
        .merge(this.__onLocationCreatedStream)
        .flatMap(_ => this._search(this.__userIdCache));
        // .subscribe(v => console.log('---->>>', v));
  }


  _initOnLocationCreatedStream(createLocationStream) {
    this.__onLocationCreatedStream =
      createLocationStream
        .filter(propEq('eventType', this.__LOCATION_CREATED));
  }
}
