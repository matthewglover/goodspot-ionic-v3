import Rx from 'rxjs/dist/rx.lite';


const GEOLOCATION_OPTIONS = {
  maximumAge: 60000,
  enableHighAccuracy: true,
  timeout: 5000
};


export default class Geolocation {

  __$cordovaGeolocation
  __positionStream

  constructor($cordovaGeolocation) {
    this.__$cordovaGeolocation = $cordovaGeolocation;

    this._initPositionStream();
  }


  get positionStream() {
    return this.__positionStream;
  }


  _initPositionStream() {
    this.__positionStream = this._buildPositionStream();
  }


  _buildPositionStream() {
    return Rx.Observable
      .fromPromise(this._buildPositionPromise())
      .map(data => [data.coords.latitude, data.coords.longitude]);
  }


  _buildPositionPromise() {
    return this.__$cordovaGeolocation.getCurrentPosition(GEOLOCATION_OPTIONS);
  }
}
