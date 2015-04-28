// TODO: Implement userDefinedLocationStream

import Rx from 'rxjs/dist/rx.lite';
import {propEq} from 'ramda';


const CURRENT_LOCATION = `CURRENT_LOCATION`;
const USER_DEFINED_LOCATION = `USER_LOCATION`


export default class LocationManager {


  __gsGeocoder

  __currentLocationStream
  __userDefinedLocationStream

  __locationSearchResultsStream

  __gsLocationCreateEventListener
  __createLocationStream

  __activeLocation

  __activeLocationType




  constructor({gsCurrentLocation, gsLocationSearchEventListener, gsGeocoder, gsLocationCreateEventListener, gsUserLocations}) {
    this.__currentLocationStream = gsCurrentLocation.locationStream;
    this.__userDefinedLocationStream = undefined;

    this.__gsGeocoder = gsGeocoder;

    this.__activeLocationType = CURRENT_LOCATION;

    this.__gsLocationCreateEventListener = gsLocationCreateEventListener;
    this.__createLocationStream = gsLocationCreateEventListener.eventStream;

    this._reactToLocationSearchEvents(gsLocationSearchEventListener);
    this._reactToLocationCreatedStream();
  }


  get activeLocationStream() {
    switch (this.__activeLocationType) {
      case CURRENT_LOCATION :
        return this.__currentLocationStream;
      case USER_DEFINED_LOCATION :
        return this.__userDefinedLocationStream;
    }
  }


  get locationSearchResultsStream() {
    return this.__locationSearchResultsStream;
  }


  get __CREATE_LOCATION() {
    return this.__gsLocationCreateEventListener.CREATE_LOCATION;
  }


  get __LOCATION_CREATED() {
    return this.__gsLocationCreateEventListener.LOCATION_CREATED;
  }


  _reactToLocationSearchEvents(gsLocationSearchEventListener) {
    this.__locationSearchResultsStream =
      gsLocationSearchEventListener
        .eventStream
        .flatMap(searchText => this._geocode(searchText));
  }


  _reactToLocationCreatedStream() {
    this.__onLocationCreatedStream =
      this.__createLocationStream
        .filter(propEq('eventType', this.__LOCATION_CREATED));
  }


  _geocode(searchText) {
    return this.__gsGeocoder.geocode(searchText);
  }
}
