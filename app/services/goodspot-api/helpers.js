import Rx from 'rxjs/dist/rx.lite';
import {prop} from 'ramda';
import {GOODSPOT_BASE_URI} from '../../config';


export const buildUpdatePersonUrl =
  () => `${GOODSPOT_BASE_URI}/person/`;


export const buildSpotPlaceUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/place/`;


export const buildUnspotPlaceUrl =
  (personId, placeId) => `${GOODSPOT_BASE_URI}/person/${personId}/place/${placeId}/`;


export const buildSearchLocationUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/places/`;


export const buildCreateUserDefinedLocationUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/user-defined-location/`;


export const buildCreateCurrentLocationUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/current-location/`;


export const buildDeleteLocationUrl =
  (personId, locationId) => `${GOODSPOT_BASE_URI}/person/${personId}/location/${locationId}/`;


export const buildEditLocationUrl =
  (personId, locationId) => `${GOODSPOT_BASE_URI}/person/${personId}/location/${locationId}/`;


export const buildGetPersonLocationsUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/locations/`;


export const buildUpdateFriendsUrl =
  (personId) => `${GOODSPOT_BASE_URI}/person/${personId}/friends/`;


export const buildTagPlaceUrl =
  (personId, placeId) => `${GOODSPOT_BASE_URI}/person/${personId}/place/${placeId}/`;


export const buildUntagPlaceUrl =
  (personId, placeId, tag) => `${GOODSPOT_BASE_URI}/person/${personId}/place/${placeId}/tag/${tag}/`;


export const toObservable = (promise) =>
  Rx.Observable
    .fromPromise(promise)
    .map(prop('data'));
