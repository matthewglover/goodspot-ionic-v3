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


  _createUserDefinedLocation(location) {
    const personId = this.__gsUser.userId;
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
    this.__userDefinedLocationCreatedEventStream =
      this.__createUserDefinedLocationEventStream
        .flatMap(location => this._createUserDefinedLocation(location))
        .publish();

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

    // this.__createCurrentLocationEventStream
    //   .subscribe(l => console.log('------------>', l));
  }


  _initCurrentLocationCreatedEventStream() {
    this.__currentLocationCreatedEventStream =
      this.__createCurrentLocationEventStream
        .flatMap(pos => this._createCurrentLocation(pos));

    // this.__currentLocationCreatedEventStream
    //   .subscribe(res => console.log('....', res));
  }


  _createCurrentLocation(pos) {
    const personId = this.__gsUser.userId;
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
