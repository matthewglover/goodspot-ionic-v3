import Rx from 'rxjs/dist/rx.lite';

import {TAG_PLACE, PLACE_TAGGED} from '../../app-constants';


export default class PlaceTagEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser

  __tagPlaceEventStream
  __placeTaggedEventStream

  __eventStream

  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._reactToTagPlaceEvents();
  }


  get eventStream() {
    return this.__eventStream;
  }


  get PLACE_TAGGED() {
    return PLACE_TAGGED;
  }


  get TAG_PLACE() {
    return TAG_PLACE;
  }


  _reactToTagPlaceEvents() {
    this._initTagPlaceEventStream();
    this._initPlaceTaggedEventStream();
    this._initEventStream();
  }


  _tagPlace(personId, place, tag) {
    return this.__gsGoodspotApi.tagPlace(personId, place, tag);
  }


  _initTagPlaceEventStream() {
    this.__tagPlaceEventStream =
      this.__gsUserEvents.getEventStream(this.TAG_PLACE);
  }


  _initPlaceTaggedEventStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__tagPlaceEventStream,
        (a, b) => [a, b]
      );

    this.__placeTaggedEventStream =
      comboStream
        .flatMap(([personId, {place, tag}]) => this._tagPlace(personId, place, tag));
  }


  _initEventStream() {
    const tagEventStream =
      this.__tagPlaceEventStream
        .map(place => ({eventType: this.TAG_PLACE, place}));

    const taggedEventStream =
      this.__placeTaggedEventStream
        .map(tag => ({eventType: this.PLACE_TAGGED, tag}));

    this.__eventStream =
      tagEventStream.merge(taggedEventStream);
  }
}
