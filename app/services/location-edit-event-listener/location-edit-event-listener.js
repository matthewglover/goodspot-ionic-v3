import Rx from 'rxjs/dist/rx.lite';

import {
  EDIT_LOCATION,
  LOCATION_EDITED
} from '../../app-constants';


export default class LocationEditEventListener {


  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __editLocationEventStream
  __locationEditedEventStream

  __eventStream


  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToEditLocationEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get LOCATION_EDITED() {
    return LOCATION_EDITED;
  }


  get EDIT_LOCATION() {
    return EDIT_LOCATION;
  }


  _editLocation(personId, location) {
    return this.__gsGoodspotApi.editLocation(personId, location);
  }


  _reactToEditLocationEvents() {
    this._initEditLocationEventStream();
    this._initLocationEditedEventStream();
    this._initEventStream();
  }


  _initEditLocationEventStream() {
    this.__editLocationEventStream =
      this.__gsUserEvents.getEventStream(this.EDIT_LOCATION);
  }


  _initLocationEditedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__editLocationEventStream,
        (a, b) => [a, b]
      );

    this.__locationEditedEventStream =
      comboStream
        .flatMap(([personId, location]) => this._editLocation(personId, location))
        .replay(1);

    this.__locationEditedEventStream.connect();
  }


  _initEventStream() {
    const editEventStream =
      this.__editLocationEventStream
        .map(location => ({eventType: this.EDIT_LOCATION, location}));

    const editedEventStream =
      this.__locationEditedEventStream
        .map(locationData => ({eventType: this.LOCATION_DELETED, locationData}));

    this.__eventStream =
      editedEventStream.merge(editedEventStream);
  }
}
