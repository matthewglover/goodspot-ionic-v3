import {has, pick, isNil, prop, propEq, merge} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


export default class PlaceSearchManager {

  __gsPlaceSearch
  __gsUser

  __gsPlaceSpotEventListener
  __gsPlaceUnspotEventListener

  __gsPlaceTagEventListener
  __gsPlaceUntagEventListener

  __placeSpotStream
  __placeUnspotStream

  __placeTagStream
  __placeUntagStream

  __onPlaceSpottedStream
  __onPlaceUnspottedStream

  __onPlaceTaggedStream
  __onPlaceUntaggedStream

  __activeLocationStream
  __searchResultsStream


  constructor({
    gsLocationManager,
    gsPlaceSearch,
    gsUser,
    gsPlaceSpotEventListener,
    gsPlaceUnspotEventListener,
    gsPlaceTagEventListener,
    gsPlaceUntagEventListener
  }) {
    this.__gsPlaceSpotEventListener = gsPlaceSpotEventListener;
    this.__gsPlaceUnspotEventListener = gsPlaceUnspotEventListener;
    this.__gsPlaceTagEventListener = gsPlaceTagEventListener;
    this.__gsPlaceUntagEventListener = gsPlaceUntagEventListener;

    this.__activeLocationStream = gsLocationManager.selectedLocationStream;

    this.__placeSpotStream = gsPlaceSpotEventListener.eventStream;
    this.__placeUnspotStream = gsPlaceUnspotEventListener.eventStream;

    this.__placeTagStream = gsPlaceTagEventListener.eventStream;
    this.__placeUntagStream = gsPlaceUntagEventListener.eventStream;

    this.__gsPlaceSearch = gsPlaceSearch;
    this.__gsUser = gsUser;

    this._reactToActiveLocationStream();

    this._reactToPlaceSpottedStream();
    this._reactToPlaceUnspottedStream();

    this._reactToPlaceTaggedStream();
    this._reactToPlaceUntaggedStream();

    this._initSearchResultsStream();
  }


  get searchResultsStream() {
    return this.__searchResultsStream;
  }


  get __SPOT_PLACE() {
    return this.__gsPlaceSpotEventListener.SPOT_PLACE;
  }


  get __PLACE_SPOTTED() {
    return this.__gsPlaceSpotEventListener.PLACE_SPOTTED;
  }


  get __PLACE_UNSPOTTED() {
    return this.__gsPlaceUnspotEventListener.PLACE_UNSPOTTED;
  }


  get __PLACE_TAGGED() {
    return this.__gsPlaceTagEventListener.PLACE_TAGGED;
  }


  get __PLACE_UNTAGGED() {
    return this.__gsPlaceUntagEventListener.PLACE_UNTAGGED;
  }


  _reactToActiveLocationStream() {
    this.__onActiveLocationUpdatedStream =
      this.__activeLocationStream
        .filter(has('countryCode'))
        .map(pick(['pos', 'countryCode']))
        .replay(1);

    this.__onActiveLocationUpdatedStream.connect();

    this.__onActiveLocationUpdatedStream.subscribe(angular.noop);
  }


  _reactToPlaceSpottedStream() {
    const placeSpottedStream =
      this.__placeSpotStream
        .filter(propEq('eventType', this.__PLACE_SPOTTED));

    const comboStream =
      Rx.Observable.combineLatest(
        placeSpottedStream,
        this.__onActiveLocationUpdatedStream,
        (a, b) => b
      );

    this.__onPlaceSpottedStream =
      comboStream
        .replay(1);

    this.__onPlaceSpottedStream.connect();
  }


  _reactToPlaceUnspottedStream() {
    const placeUnspottedStream =
      this.__placeUnspotStream
        .filter(propEq('eventType', this.__PLACE_UNSPOTTED));
    const comboStream =
      Rx.Observable.combineLatest(
        placeUnspottedStream,
        this.__onActiveLocationUpdatedStream,
        (a, b) => b
      );

    this.__onPlaceUnspottedStream =
      comboStream
        .replay(1);

    this.__onPlaceUnspottedStream.connect();
  }


  _reactToPlaceTaggedStream() {
    const placeTaggedStream =
      this.__placeTagStream
        .filter(propEq('eventType', this.__PLACE_TAGGED));

    const comboStream =
      Rx.Observable.combineLatest(
        placeTaggedStream,
        this.__onActiveLocationUpdatedStream,
        (a, b) => b
      );

    this.__onPlaceTaggedStream =
      comboStream
        .replay(1);

    this.__onPlaceTaggedStream.connect();
  }


  _reactToPlaceUntaggedStream() {
    const placeUntaggedStream =
      this.__placeUntagStream
        .filter(propEq('eventType', this.__PLACE_UNTAGGED));

    const comboStream =
      Rx.Observable.combineLatest(
        placeUntaggedStream,
        this.__onActiveLocationUpdatedStream,
        (a, b) => b
      );

    this.__onPlaceUntaggedStream =
      comboStream
        .replay(1);

    this.__onPlaceUntaggedStream.connect();
  }


  _initSearchResultsStream() {
    const locationStream =
      this.__onPlaceSpottedStream
        .merge(this.__onPlaceUnspottedStream)
        .merge(this.__onPlaceTaggedStream)
        .merge(this.__onPlaceUntaggedStream)
        .merge(this.__onActiveLocationUpdatedStream);

    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        locationStream,
        (a, b) => [a, b]
      );

    this.__searchResultsStream =
      comboStream
        .flatMap(([personId, location]) => this._searchLocation(personId, location))
        .replay(1);

    this.__searchResultsStream.connect();

    this.__searchResultsStream.subscribe(angular.noop);
  }


  _searchLocation(personId, location) {
    return this.__gsPlaceSearch.searchLocation(personId, location);
  }
}
