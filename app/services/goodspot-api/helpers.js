import Rx from 'rxjs/dist/rx.lite';
import {prop} from 'ramda';


const BASE_URL = `http://localhost:8000`;


export const buildUpdatePersonUrl =
  () => `${BASE_URL}/person/`;


export const buildCreatePlaceUrl =
  (personId) => `${BASE_URL}/person/${personId}/place/`;


export const buildSearchLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/places/`;


export const buildCreateLocationUrl =
  (personId) => `${BASE_URL}/person/${personId}/location/`;


export const buildSearchPersonLocationsUrl =
  (personId) => `${BASE_URL}/person/${personId}/locations/`;

export const toObservable = (promise) =>
  Rx.Observable
    .fromPromise(promise)
    .map(prop('data'));
