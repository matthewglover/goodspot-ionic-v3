import Rx from 'rxjs/dist/rx.lite';

import {CREATE_CURRENT_LOCATION} from '../../app-constants';


const GEOLOCATION_OPTIONS = {
  maximumAge: 10000,
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
    this._reactToPosition();
  }


  get positionStream() {
    return this.__positionStream;
  }


  _reactToPosition() {
    this.__positionStream
      .subscribe(
        pos => this._raiseEvent(CREATE_CURRENT_LOCATION, pos),
        err => console.log('---->', err));
  }


  _initPositionStream() {
    this.__positionStream =
      Rx.Observable
        .fromPromise(this._buildPositionPromise())
        .do(d => console.log('Got position....', d))
        .map(data => [data.coords.latitude, data.coords.longitude]);
  }


  _buildPositionPromise() {
    console.log('getting position..');
    return this.__$cordovaGeolocation
      .getCurrentPosition(GEOLOCATION_OPTIONS);
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }
}
