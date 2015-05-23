import Rx from 'rxjs/dist/rx.lite';

import {SPOT_PLACE, PLACE_SPOTTED} from '../../app-constants';


export default class PlaceSpotEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __spotPlaceEventStream
  __placeSpottedEventStream

  __eventStream

  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToSpotPlaceEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get PLACE_SPOTTED() {
    return PLACE_SPOTTED;
  }


  get SPOT_PLACE() {
    return SPOT_PLACE;
  }


  _reactToSpotPlaceEvents() {
    this._initSpotPlaceEventStream();
    this._initPlaceSpottedEventStream();
    this._initEventStream();
  }


  _spotPlace(personId, place) {
    return this.__gsGoodspotApi.spotPlace(personId, place);
  }


  _initSpotPlaceEventStream() {
    this.__spotPlaceEventStream =
      this.__gsUserEvents.getEventStream(SPOT_PLACE);
  }


  _initPlaceSpottedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__spotPlaceEventStream,
        (a, b) => [a, b]
      );

    this.__placeSpottedEventStream =
      comboStream
        .flatMap(([personId, place]) => this._spotPlace(personId, place));
  }


  _initEventStream() {
    const spotEventStream =
      this.__spotPlaceEventStream
        .map(place => ({eventType: this.SPOT_PLACE, place}));

    const spottedEventStream =
      this.__placeSpottedEventStream
        .map(({placeData}) => ({eventType: this.PLACE_SPOTTED, place: placeData}));

    this.__eventStream =
      spotEventStream.merge(spottedEventStream);
  }
}
