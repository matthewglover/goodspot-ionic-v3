import {
  buildUpdatePersonUrl,
  buildSpotPlaceUrl,
  buildUnspotPlaceUrl,
  buildSearchLocationUrl,
  buildCreateUserDefinedLocationUrl,
  buildCreateCurrentLocationUrl,
  buildDeleteLocationUrl,
  buildEditLocationUrl,
  buildGetPersonLocationsUrl,
  buildUpdateFriendsUrl,
  buildTagPlaceUrl,
  buildUntagPlaceUrl,
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
  spotPlace(personId, place) {
    const url = buildSpotPlaceUrl(personId);
    const promise = this.__$http.put(url, place);
    return toObservable(promise);
  }


  unspotPlace(personId, place) {
    const url = buildUnspotPlaceUrl(personId, place.id);
    const promise = this.__$http.delete(url);
    return toObservable(promise);
  }


  searchLocation(personId, location) {
    const url = buildSearchLocationUrl(personId);
    const promise = this.__$http.get(url, {params: location});
    return toObservable(promise);
  }


  createUserDefinedLocation(personId, location) {
    const url = buildCreateUserDefinedLocationUrl(personId);
    const promise = this.__$http.post(url, location);
    return toObservable(promise);
  }


  createCurrentLocation(personId, pos) {
    const url = buildCreateCurrentLocationUrl(personId);
    const promise = this.__$http.post(url, pos);
    return toObservable(promise);
  }


  editLocation(personId, location) {
    const url = buildEditLocationUrl(personId, location.id);
    const promise = this.__$http.put(url, location);
    return toObservable(promise);
  }


  deleteLocation(personId, location) {
    const url = buildDeleteLocationUrl(personId, location.id);
    const promise = this.__$http.delete(url);
    return toObservable(promise);
  }


  getPersonLocations(personId) {
    const url = buildGetPersonLocationsUrl(personId);
    const promise = this.__$http.get(url);
    return toObservable(promise);
  }


  updateFriends(personId) {
    const url = buildUpdateFriendsUrl(personId);
    const promise = this.__$http.put(url, {});
    return toObservable(promise);
  }


  tagPlace(personId, place, tag) {
    const url = buildTagPlaceUrl(personId, place.id);
    const promise = this.__$http.put(url, {tag});
    return toObservable(promise);
  }


  untagPlace(personId, place, tag) {
    const url = buildUntagPlaceUrl(personId, place.id, tag);
    const promise = this.__$http.delete(url);
    return toObservable(promise);
  }
}
