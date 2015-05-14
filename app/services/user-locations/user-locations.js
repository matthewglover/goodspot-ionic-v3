import Rx from 'rxjs/dist/rx.lite';
import {propEq} from 'ramda';


export default class UserLocations {

  __gsGoodspotApi
  __userIdStream

  // __userIdCache

  __gsLocationCreateEventListener

  __locationStream


  constructor({gsGoodspotApi, gsUser, gsLocationCreateEventListener}) {
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsLocationCreateEventListener = gsLocationCreateEventListener;

    this.__userIdStream = gsUser.userIdStream

    this._initOnLocationCreatedStream(gsLocationCreateEventListener.eventStream);
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


  _search(personId) {
    return this.__gsGoodspotApi.getPersonLocations(personId);
  }


  _initLocationStream() {
    const mergeStream =
      this.__userIdStream
        .merge(this.__onLocationCreatedStream);

    const comboStream =
      Rx.Observable.combineLatest(
        this.__userIdStream,
        mergeStream,
        (a, b) => a
      );

    this.__locationStream =
      comboStream
        .flatMap(personId => this._search(personId));
  }


  _initOnLocationCreatedStream(createLocationStream) {
    this.__onLocationCreatedStream =
      createLocationStream
        .filter(propEq('eventType', this.__LOCATION_CREATED));
  }
}
