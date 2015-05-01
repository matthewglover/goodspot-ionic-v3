import {has, pick, isNil, prop, propEq, merge} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


export default class PlaceSearchManager {

  __gsPlaceSearch
  __gsUser

  __gsPlaceSpotEventListener

  __activeLocationStream
  __placeSpotStream
  __placesStream

  __placesCache
  __locationCache


  constructor({gsLocationManager, gsPlaceSearch, gsUser, gsPlaceSpotEventListener}) {
    this.__gsPlaceSpotEventListener = gsPlaceSpotEventListener;

    this.__activeLocationStream = gsLocationManager.selectedLocationStream;
    this.__placeSpotStream = gsPlaceSpotEventListener.eventStream;

    this.__gsPlaceSearch = gsPlaceSearch;
    this.__gsUser = gsUser;

    this._reactToActiveLocationStream();
    // this._reactToSpotPlaceStream();
    this._reactToPlaceSpottedStream();

    this._initPlacesStream();
  }


  get placesStream() {
    if (isNil(this.__placesCache)) return this.__placesStream;

    return Rx.Observable
      .return(this.__placesCache)
      .merge(this.__placesStream);
  }


  get __userId() {
    return this.__gsUser.userId;
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
        .do(location => this._cacheLocation(location));
  }


  // _reactToSpotPlaceStream() {
  //   this.__placeSpotStream
  //     .filter(propEq('eventType', this.__SPOT_PLACE))
  //     .map(prop('place'))
  //     .subscribe(place => console.log('spot place', place));
  // }


  _reactToPlaceSpottedStream() {
    this.__onPlaceSpottedStream =
      this.__placeSpotStream
        .filter(propEq('eventType', this.__PLACE_SPOTTED))
        .map(_ => this.__locationCache);
  }


  _initPlacesStream() {
    this.__placesStream =
      this.__onPlaceSpottedStream.merge(this.__onActiveLocationUpdatedStream)
        .flatMap(location => this._searchLocation(location))
        .do(places => this._cachePlaces(places));
  }


  _searchLocation(location) {
    return this.__gsPlaceSearch.searchLocation(this.__userId, location);
  }


  _cachePlaces(places) {
    this.__placesCache = places;
  }


  _cacheLocation(location) {
    this.__locationCache = location;
  }
}
