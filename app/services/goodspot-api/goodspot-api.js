import {
  buildUpdatePersonUrl,
  buildCreatePlaceUrl,
  buildSearchLocationUrl,
  toObservable
} from './helpers';


export default class GoodspotApi {

  __$http

  constructor({$http}) {
    this.__$http = $http;
  }


  // {_uid: String, name: String} -> Observable
  updatePerson(person) {
    const url = buildUpdatePersonUrl();
    const promise = this.__$http.put(url, person);
    return toObservable(promise);
  }


  // String, {_uid: String, name: String, lat: Number, lon: Number, data: SerializedJSON} -> Observable
  createPlace(personId, place) {
    const url = buildCreatePlaceUrl(personId);
    const promise = this.__$http.put(url, place);
    return toObservable(promise);
  }


  searchLocation(personId, location) {
    const url = buildSearchLocationUrl(personId);
    const promise = this.__$http.get(url, {params: location});
    return toObservable(promise);
  }
}