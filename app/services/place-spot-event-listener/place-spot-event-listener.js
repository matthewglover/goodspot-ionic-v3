import {SPOT_PLACE} from '../../app-constants';


export default class PlaceSpotEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __eventStream

  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._initSpotPlaceEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get PLACE_SPOTTED() {
    return `PLACE_SPOTTED`;
  }


  get SPOT_PLACE() {
    return `SPOT_PLACE`;
  }


  _initSpotPlaceEvents() {
    const spotPlaceEventStream =
      this.__gsUserEvents.getEventStream(SPOT_PLACE);

    const placeSpottedEventStream =
      spotPlaceEventStream
        .flatMap(place => this._spotPlace(place));

    const listenerSpotEventStream =
      spotPlaceEventStream
        .map(place => ({eventType: this.SPOT_PLACE, place}));

    const listenerSpottedEventStream =
      placeSpottedEventStream
        .map(({placeData}) => ({eventType: this.PLACE_SPOTTED, place: placeData}));

    this.__eventStream =
      listenerSpottedEventStream.merge(listenerSpotEventStream);
  }


  _spotPlace(place) {
    const personId = this.__gsUser.userId;
    return this.__gsGoodspotApi.createPlace(personId, place);
  }
}
