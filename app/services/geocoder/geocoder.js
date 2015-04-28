import Rx from 'rxjs/dist/rx.lite';
import cleanData from './clean-data';
import {reverseOptions, geocodeOptions, pluckFirst} from './geocoder-helpers';

const MAPQUEST_GEOCODE_URL = 'http://open.mapquestapi.com/nominatim/v1/search.php';
const MAPQUEST_REVERSE_URL = 'http://open.mapquestapi.com/nominatim/v1/reverse.php';


export default class Geocoder {

  __$http

  constructor({$http}) {
    this.__$http = $http;
  }


  reverse(pos) {
    return Rx.Observable
      .fromPromise(this._getReverse(pos))
      .map(cleanData)
      .map(pluckFirst);
  }


  geocode(searchText) {
    return Rx.Observable
      .fromPromise(this._getGeocode(searchText))
      .map(cleanData);
  }


  _getReverse(pos) {
    return this.__$http.get(MAPQUEST_REVERSE_URL, reverseOptions(pos));
  }


  _getGeocode(searchText) {
    return this.__$http.get(MAPQUEST_GEOCODE_URL, geocodeOptions(searchText))
  }
}
