import Rx from 'rxjs/dist/rx.lite';
import {reverseOptions, geocodeOptions, pluckFirst, getData} from './geocoder-helpers';
import {GOODSPOT_BASE_URI} from '../../config';

const GEOCODE_URL = `${GOODSPOT_BASE_URI}/geocoder/geocode`;
const REVERSE_URL = `${GOODSPOT_BASE_URI}/geocoder/reverse/`;


export default class Geocoder {

  __$http


  constructor({$http}) {
    this.__$http = $http;
  }


  reverse(pos) {
    return Rx.Observable
      .fromPromise(this._getReverse(pos))
      .map(getData)
      .map(pluckFirst);
  }


  geocode(searchString) {
    return Rx.Observable
      .fromPromise(this._getGeocode(searchString))
      .map(getData);
  }


  _getReverse(pos) {
    return this.__$http.get(REVERSE_URL, reverseOptions(pos));
  }


  _getGeocode(searchString) {
    return this.__$http.get(GEOCODE_URL, geocodeOptions(searchString))
  }
}
