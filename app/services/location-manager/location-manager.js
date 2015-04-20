// TODO: Implement userDefinedLocationStream

import Rx from 'rxjs/dist/rx.lite';


const CURRENT_LOCATION = `CURRENT_LOCATION`;
const USER_DEFINED_LOCATION = `USER_LOCATION`


export default class LocationManager {

  __currentLocationStream;
  __userDefinedLocationStream;

  __activeLocation;

  __activeLocationType;


  constructor({gsCurrentLocation}) {
    console.log('Creating Location Manager');

    this.__currentLocationStream = gsCurrentLocation.locationStream;
    this.__userDefinedLocationStream = undefined;

    this.__activeLocationType = CURRENT_LOCATION;
  }


  get activeLocationStream() {
    switch (this.__activeLocationType) {
      case CURRENT_LOCATION :
        return this.__currentLocationStream;
      case USER_DEFINED_LOCATION :
        return this.__userDefinedLocationStream;
    }
  }
}
