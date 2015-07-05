import Rx from 'rxjs/dist/rx.lite';
import {GOODSPOT_BASE_URI} from '../../config';


const FACTUAL_API_URL = `${GOODSPOT_BASE_URI}/factual/search`;


const locationToParams = ({pos, countryCode}) =>
  ({
    lat: pos[0],
    lon: pos[1],
    countryCode
  })

export default class FactualSearch {

  __$http

  constructor({$http}) {
    this.__$http = $http;
  }


  searchLocation(location) {
    return Rx.Observable
      .fromPromise(this._searchLocationPromise(location))
      .map(response => response.data);
  }


  _searchLocationPromise(location) {
    return this.__$http.get(FACTUAL_API_URL, {params: locationToParams(location)});
  }
}
