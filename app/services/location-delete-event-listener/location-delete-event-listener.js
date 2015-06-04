import Rx from 'rxjs/dist/rx.lite';
import {prop} from 'ramda';

import {DELETE_LOCATION, LOCATION_DELETED} from '../../app-constants';


export default class LocationDeleteEventListener {


  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __deleteLocationEventStream
  __locationDeletedEventStream

  __eventStream


  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToDeleteLocationEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get DELETE_LOCATION() {
    return DELETE_LOCATION;
  }


  get LOCATION_DELETED() {
    return LOCATION_DELETED;
  }


  _deleteLocation(personId, location) {
    return this.__gsGoodspotApi.deleteLocation(personId, location);
  }


  _reactToDeleteLocationEvents() {
    this._initDeleteLocationEventStream();
    this._initLocationDeletedEventStream();
    this._initEventStream();
  }


  _initDeleteLocationEventStream() {
    this.__deleteLocationEventStream =
      this.__gsUserEvents.getEventStream(this.DELETE_LOCATION);
  }


  _initLocationDeletedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__deleteLocationEventStream,
        (a, b) => [a, b]
      );

    this.__locationDeletedEventStream =
      comboStream
        .flatMap(([personId, location]) => this._deleteLocation(personId, location))
        .replay(1);

    this.__locationDeletedEventStream.connect();
  }


  _initEventStream() {
    const deleteEventStream =
      this.__deleteLocationEventStream
        .map(location => ({eventType: this.DELETE_LOCATION, location}));

    const deletedEventStream =
      this.__locationDeletedEventStream
        .map(locationData => ({eventType: this.LOCATION_DELETED, locationData}));

    this.__eventStream =
      deleteEventStream.merge(deletedEventStream);
  }
}
