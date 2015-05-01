import Rx from 'rxjs/dist/rx.lite';

import {CREATE_CURRENT_LOCATION} from '../../app-constants';


const GEOLOCATION_OPTIONS = {
  maximumAge: 60000,
  enableHighAccuracy: true,
  timeout: 5000
};


export default class Geolocation {

  __$cordovaGeolocation
  __gsUserEvents

  __positionStream

  constructor($cordovaGeolocation, gsUserEvents) {
    this.__$cordovaGeolocation = $cordovaGeolocation;
    this.__gsUserEvents = gsUserEvents;

    this._initPositionStream();
  }


  get positionStream() {
    return this.__positionStream;
  }


  _initPositionStream() {
    this.__positionStream = this._buildPositionStream();

    this.__positionStream
      .subscribe(pos => this._raiseEvent(CREATE_CURRENT_LOCATION, pos));
  }


  _buildPositionStream() {
    return Rx.Observable
      .fromPromise(this._buildPositionPromise())
      .map(data => [data.coords.latitude, data.coords.longitude]);
  }


  _buildPositionPromise() {
    return this.__$cordovaGeolocation.getCurrentPosition(GEOLOCATION_OPTIONS);
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }
}
