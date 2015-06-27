import Rx from 'rxjs/dist/rx.lite';

import {find, propEq, isNil, partial} from 'ramda';

import {UNTAG_PLACE, PLACE_UNTAGGED} from '../../app-constants';



const getPlaceFromId = (id, places) =>
  find(propEq('id', id))(places);


const buildTag = (name) =>
  ({name, totalTags: 0, isMyTag: false});


const minusOne = (val) =>
  isNil(val) ?
    0 :
    val - 1;


const getTagByName = (place, tagName) => {
  if (isNil(place.tags)) place.tags = [];

  let tag = find(propEq('name', tagName))(place.tags);

  if (isNil(tag)) {
    tag = buildTag(tagName);
    place.tags.push(tag);
  }

  return tag;
};


const buildUntagFn = ({placeId, tag}, places) => {
  const place = getPlaceFromId(placeId, places);
  const tagObj = getTagByName(place, tag);

  tagObj.totalTags = minusOne(tagObj.totalTags);
  tagObj.isMyTag = false;

  return places;
};


const buildSignature =
  ({placeId, tagName}) => `UNTAG:${placeId}|${tagName}`;



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
        .map(data => ({
          eventType: this.PLACE_UNTAGGED,
          transformer: partial(buildUntagFn, data),
          signature: buildSignature(data)
        }));

    this.__eventStream =
      untagEventStream.merge(untaggedEventStream);
  }
}
