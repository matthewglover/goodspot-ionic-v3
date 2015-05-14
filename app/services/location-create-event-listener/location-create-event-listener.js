import Rx from 'rxjs/dist/rx.lite';

import {CREATE_USER_DEFINED_LOCATION, CREATE_CURRENT_LOCATION} from '../../app-constants';


export default class LocationCreateEventListener {


  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __createUserDefinedLocationEventStream
  __userDefinedLocationCreatedEventStream

  __createCurrentLocationEventStream

  __currentLocationEventStream
  __userDefinedLocationEventStream
  __eventStream


  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToCreateUserDefinedLocationEvents();
    this._reactToCreateCurrentLocationEvents();
    this._initEventStream();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get LOCATION_CREATED() {
    return `LOCATION_CREATED`;
  }


  get CREATE_LOCATION() {
    return `CREATE_LOCATION`;
  }


  _reactToCreateUserDefinedLocationEvents() {
    this._initCreateUserDefinedLocationEventStream();
    this._initUserDefinedLocationCreatedEventStream();
    this._initUserDefinedLocationEventStream();
  }


  _createUserDefinedLocation(personId, location) {
    return this.__gsGoodspotApi.createUserDefinedLocation(personId, location);
  }


  _initCreateUserDefinedLocationEventStream() {
    this.__createUserDefinedLocationEventStream =
      this.__gsUserEvents
        .getEventStream(CREATE_USER_DEFINED_LOCATION)
        .map(({location}) => location)
        .publish();

    this.__createUserDefinedLocationEventStream.connect();
  }


  _initUserDefinedLocationCreatedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__createUserDefinedLocationEventStream,
        (a, b) => [a, b]
      );

    this.__userDefinedLocationCreatedEventStream =
      comboStream
        .flatMap(([personId, location]) => this._createUserDefinedLocation(personId, location))
        .replay(1);

    this.__userDefinedLocationCreatedEventStream.connect();
  }


  _initUserDefinedLocationEventStream() {
    const createEventStream =
      this.__createUserDefinedLocationEventStream
        .map(location => ({eventType: this.CREATE_LOCATION, location}));

    const createdEventStream =
      this.__userDefinedLocationCreatedEventStream
        .map(locationData => ({eventType: this.LOCATION_CREATED, locationData}));

    this.__userDefinedLocationEventStream =
      createEventStream.merge(createdEventStream);
  }


  _reactToCreateCurrentLocationEvents() {
    this._initCreateCurrentLocationEventStream();
    this._initCurrentLocationCreatedEventStream();
    this._initCurrentLocationEventStream();
  }


  _initCreateCurrentLocationEventStream() {
    this.__createCurrentLocationEventStream =
      this.__gsUserEvents
        .getEventStream(CREATE_CURRENT_LOCATION)
        .publish();

    this.__createCurrentLocationEventStream.connect();
  }


  _initCurrentLocationCreatedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__createCurrentLocationEventStream,
        (a, b) => [a, b]
      );

    this.__currentLocationCreatedEventStream =
      comboStream
        .flatMap(([personId, pos]) => this._createCurrentLocation(personId, pos));
  }


  _createCurrentLocation(personId, pos) {
    return this.__gsGoodspotApi.createCurrentLocation(personId, pos);
  }


  _initCurrentLocationEventStream() {
    const createEventStream =
      this.__createCurrentLocationEventStream
        .map(pos => ({eventType: this.CREATE_LOCATION, pos}));

    const createdEventStream =
      this.__currentLocationCreatedEventStream
        .map(locationData => ({eventType: this.LOCATION_CREATED, locationData}));

    this.__currentLocationEventStream =
      createEventStream.merge(createdEventStream);
  }


  _initEventStream() {
    this.__eventStream =
      this.__currentLocationEventStream
        .merge(this.__userDefinedLocationEventStream)
        .publish();

    this.__eventStream.connect();
  }
}
