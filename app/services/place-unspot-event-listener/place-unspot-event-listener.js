import Rx from 'rxjs/dist/rx.lite';

import {UNSPOT_PLACE, PLACE_UNSPOTTED} from '../../app-constants';


export default class PlaceUnspotEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __unspotPlaceEventStream
  __placeUnspottedEventStream

  __eventStream


  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToUnspotPlaceEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get PLACE_UNSPOTTED() {
    return PLACE_UNSPOTTED;
  }


  get UNSPOT_PLACE() {
    return UNSPOT_PLACE;
  }


  _reactToUnspotPlaceEvents() {
    this._initUnspotPlaceEventStream();
    this._initPlaceUnspottedEventStream();
    this._initEventStream();
  }


  _unspotPlace(personId, place) {
    return this.__gsGoodspotApi.unspotPlace(personId, place);
  }


  _initUnspotPlaceEventStream() {
    this.__unspotPlaceEventStream =
      this.__gsUserEvents.getEventStream(this.UNSPOT_PLACE);
  }


  _initPlaceUnspottedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__unspotPlaceEventStream,
        (a, b) => [a, b]
      );

    this.__placeUnspottedEventStream =
      comboStream
        .flatMap(([personId, place]) => this._unspotPlace(personId, place));
  }


  _initEventStream() {
    const unspotEventStream =
      this.__unspotPlaceEventStream
        .map(place => ({eventType: this.UNSPOT_PLACE, place}));

    const unspottedEventStream =
      this.__placeUnspottedEventStream
        .map(_ => ({eventType: this.PLACE_UNSPOTTED}));

    this.__eventStream =
      unspotEventStream.merge(unspottedEventStream);
  }
}
