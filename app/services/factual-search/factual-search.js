import Rx from 'rxjs/dist/rx.lite';

import tempData from './temp_data';

const FACTUAL_API_URL = `http://localhost:8000/factual/search`

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
