import {has, pick, isNil, prop, propEq, merge} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


export default class PlaceSearchManager {

  __gsPlaceSearch
  __gsUser

  __gsPlaceSpotEventListener

  __activeLocationStream
  __placeSpotStream
  __searchResultsStream


  constructor({gsLocationManager, gsPlaceSearch, gsUser, gsPlaceSpotEventListener}) {
    this.__gsPlaceSpotEventListener = gsPlaceSpotEventListener;

    this.__activeLocationStream = gsLocationManager.selectedLocationStream;
    this.__placeSpotStream = gsPlaceSpotEventListener.eventStream;

    this.__gsPlaceSearch = gsPlaceSearch;
    this.__gsUser = gsUser;

    this._reactToActiveLocationStream();
    this._reactToPlaceSpottedStream();

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


  _initSearchResultsStream() {
    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__onPlaceSpottedStream.merge(this.__onActiveLocationUpdatedStream),
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
