import Rx from 'rxjs/dist/rx.lite';

import {CREATE_CURRENT_LOCATION, GEOLOCATION_ERROR} from '../../app-constants';


const GEOLOCATION_OPTIONS = {
  maximumAge: 10000,
  enableHighAccuracy: true,
  timeout: 5000
};


export default class Geolocation {

  __gsUserEvents

  __positionStream

  constructor($cordovaGeolocation, gsUserEvents) {
    this.__gsUserEvents = gsUserEvents;

    this._initPositionStream($cordovaGeolocation);
    this._reactToPosition();
  }


  get positionStream() {
    return this.__positionStream;
  }


  _reactToPosition() {
    this.__positionStream
      .subscribe(
        pos => this._raiseEvent(CREATE_CURRENT_LOCATION, pos),
        err => this._raiseEvent(GEOLOCATION_ERROR, err));
  }


  _initPositionStream($cordovaGeolocation) {
    this.__positionStream =
      Rx.Observable
        .fromPromise($cordovaGeolocation.getCurrentPosition(GEOLOCATION_OPTIONS))
        .do(d => console.log('Got position....', d))
        .map(data => [data.coords.latitude, data.coords.longitude]);
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }
}
