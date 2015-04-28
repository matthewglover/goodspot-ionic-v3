import {SAVE_LOCATION} from '../../app-constants';


export default class LocationCreateEventListener {


  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __createLocationEventStream
  __locationCreatedEventStream
  __eventStream

  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToSaveLocationEvents();
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


  _reactToSaveLocationEvents() {
    this._initCreateLocationEventStream();
    this._initLocationCreatedEventStream();
    this._initEventStream();
  }


  _saveLocation(location) {
    const personId = this.__gsUser.userId;
    return this.__gsGoodspotApi.createLocation(personId, location);
  }


  _initCreateLocationEventStream() {
    this.__createLocationEventStream =
      this.__gsUserEvents
        .getEventStream(SAVE_LOCATION)
        .map(({location}) => location);
  }


  _initLocationCreatedEventStream() {
    this.__locationCreatedEventStream =
      this.__createLocationEventStream
        .flatMap(location => this._saveLocation(location))
        .do(d => console.log(d));
  }


  _initEventStream() {
    const createEventStream =
      this.__createLocationEventStream
        .map(location => ({eventType: this.CREATE_LOCATION, location}));

    const createdEventStream =
      this.__locationCreatedEventStream
        .map(({locationData}) => ({eventType: this.LOCATION_CREATED, location: locationData}));

    this.__eventStream =
    createEventStream.merge(createdEventStream);
  }
}
