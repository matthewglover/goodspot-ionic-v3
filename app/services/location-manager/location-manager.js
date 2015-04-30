// TODO: Implement userDefinedLocationStream

import Rx from 'rxjs/dist/rx.lite';
import {prepend} from 'ramda';


const CURRENT_LOCATION = `CURRENT_LOCATION`;
const USER_DEFINED_LOCATION = `USER_LOCATION`


export default class LocationManager {


  __currentLocationStream
  // __userDefinedLocationStream

  __activeLocation

  __activeLocationType




  constructor({gsCurrentLocation, gsUserLocations}) {

    // Store refs to current location and userDefined location streams
    this.__currentLocationStream = gsCurrentLocation.locationStream;

    // Set default active location type
    this.__activeLocationType = CURRENT_LOCATION;

    this._reactToUserLocationStream(gsUserLocations.locationStream);
  }


  get activeLocationStream() {
    switch (this.__activeLocationType) {
      case CURRENT_LOCATION :
        return this.__currentLocationStream;
      // case USER_DEFINED_LOCATION :
      //   return this.__userDefinedLocationStream;
    }
  }


  _reactToUserLocationStream(userLocationStream) {
    this.__locationsStream =
      Rx.Observable.combineLatest(
        userLocationStream,
        this.__currentLocationStream,
        (userLocations, currentLocation) => prepend(currentLocation, userLocations)
      );

    this.__locationsStream
      .do(v => console.log(v))
      .subscribe(locations => this.__userLocations = locations);
    // debugger;
  }
}
