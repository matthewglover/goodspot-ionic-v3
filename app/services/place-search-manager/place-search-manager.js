import {has, pick} from 'ramda';

export default class PlaceSearchManager {

  __gsPlaceSearch
  __gsUser

  __activeLocationStream
  __placesStream

  constructor({gsLocationManager, gsPlaceSearch, gsUser}) {
    this.__activeLocationStream = gsLocationManager.activeLocationStream;

    this.__gsPlaceSearch = gsPlaceSearch;
    this.__gsUser = gsUser;

    this._reactToActiveLocationStream();
  }


  get placesStream() {
    return this.__placesStream;
  }


  get __userId() {
    return this.__gsUser.userId;
  }


  _reactToActiveLocationStream() {
    this.__placesStream =
      this.__activeLocationStream
        .filter(has('countryCode'))
        .map(pick(['pos', 'countryCode']))
        .flatMap(location => this._searchLocation(location))
        .do(places => console.log(places));
  }


  _searchLocation(location) {
    return this.__gsPlaceSearch.searchLocation(this.__userId, location);
  }
}
