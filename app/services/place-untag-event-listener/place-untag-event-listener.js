import Rx from 'rxjs/dist/rx.lite';

import {UNTAG_PLACE, PLACE_UNTAGGED} from '../../app-constants';


export default class PlaceUntagEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __untagPlaceEventStream
  __placeUntaggedEventStream

  __eventStream

  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToUntagPlaceEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get PLACE_UNTAGGED() {
    return PLACE_UNTAGGED;
  }


  get UNTAG_PLACE() {
    return UNTAG_PLACE;
  }


  _reactToUntagPlaceEvents() {
    this._initUntagPlaceEventStream();
    this._initPlaceUntaggedEventStream();
    this._initEventStream();
  }


  _untagPlace(personId, place, tag) {
    return this.__gsGoodspotApi.untagPlace(personId, place, tag);
  }


  _initUntagPlaceEventStream() {
    this.__untagPlaceEventStream =
      this.__gsUserEvents.getEventStream(this.UNTAG_PLACE);
  }


  _initPlaceUntaggedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__untagPlaceEventStream,
        (a, b) => [a, b]
      );

    this.__placeUntaggedEventStream =
      comboStream
        .flatMap(([personId, {place, tag}]) => this._untagPlace(personId, place, tag));
  }


  _initEventStream() {
    const untagEventStream =
      this.__untagPlaceEventStream
        .map(place => ({eventType: this.UNTAG_PLACE, place}));

    const untaggedEventStream =
      this.__placeUntaggedEventStream
        .map(tag => ({eventType: this.PLACE_UNTAGGED, tag}));

    this.__eventStream =
      untagEventStream.merge(untaggedEventStream);
  }
}
