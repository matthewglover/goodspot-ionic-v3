import Rx from 'rxjs/dist/rx.lite';
import {prop} from 'ramda';


const BASE_URL = `http://localhost:8000`;


export const buildUpdatePersonUrl =
  () => `${BASE_URL}/person/`;


export const buildCreatePlaceUrl =
  (personId) => `${BASE_URL}/person/${personId}/place/`;


export const buildSearchLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/places/`;


export const buildCreateUserDefinedLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/user-defined-location/`;


export const buildCreateCurrentLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/current-location/`;


export const buildGetPersonLocationsUrl =
  (personId) => `${BASE_URL}/person/${personId}/locations/`;

export const toObservable = (promise) =>
  Rx.Observable
    .fromPromise(promise)
    .map(prop('data'));
