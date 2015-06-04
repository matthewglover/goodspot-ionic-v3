import Rx from 'rxjs/dist/rx.lite';
import {prop} from 'ramda';


const BASE_URL = `http://localhost:8000`;


export const buildUpdatePersonUrl =
  () => `${BASE_URL}/person/`;


export const buildSpotPlaceUrl =
  (personId) => `${BASE_URL}/person/${personId}/place/`;


export const buildUnspotPlaceUrl =
  (personId, placeId) => `${BASE_URL}/person/${personId}/place/${placeId}/`;


export const buildSearchLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/places/`;


export const buildCreateUserDefinedLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/user-defined-location/`;


export const buildCreateCurrentLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/current-location/`;


export const buildDeleteLocationUrl =
  (personId, locationId) => `${BASE_URL}/person/${personId}/location/${locationId}/`;


export const buildEditLocationUrl =
  (personId, locationId) => `${BASE_URL}/person/${personId}/location/${locationId}/`;


export const buildGetPersonLocationsUrl =
  (personId) => `${BASE_URL}/person/${personId}/locations/`;


export const buildUpdateFriendsUrl =
  (personId) => `${BASE_URL}/person/${personId}/friends/`;


export const buildTagPlaceUrl =
  (personId, placeId) => `${BASE_URL}/person/${personId}/place/${placeId}/`;


export const buildUntagPlaceUrl =
  (personId, placeId, tag) => `${BASE_URL}/person/${personId}/place/${placeId}/tag/${tag}/`;


export const toObservable = (promise) =>
  Rx.Observable
    .fromPromise(promise)
    .map(prop('data'));
