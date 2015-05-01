import {propEq, isNil} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


const streamWithValue = (inputStream, value) => {
  const outputStream = Rx.Observable
    .return(value)
    .merge(inputStream)
    .publish();

  outputStream.publish();

  return outputStream;
};


export default class LocationManager {

  __gsLocationCreateEventListener

  __locationCreateEventStream

  __locationDataStream
  __selectedLocationStream
  __locationsStream

  __selectedLocation
  __locations


  constructor(gsLocationCreateEventListener) {
    this.__gsLocationCreateEventListener = gsLocationCreateEventListener;

    this.__locationCreateEventStream = gsLocationCreateEventListener.eventStream;

    this._initStreams();
  }


  get selectedLocationStream() {
    if (isNil(this.__selectedLocation))
      return this.__selectedLocationStream;
    else
      return streamWithValue(
        this.__selectedLocationStream,
        this.__selectedLocation
      );
  }


  get locationsStream() {
    if (isNil(this.__locations))
      return this.__locationsStream;
    else
      return streamWithValue(
        this.__locationsStream,
        this.__locations
      );
  }



  get __LOCATION_CREATED() {
    return this.__gsLocationCreateEventListener.LOCATION_CREATED;
  }


  _initStreams() {
    this._initLocationDataStream();
    this._initSelectedLocationStream();
    this._initLocationsStream();
  }


  _initLocationDataStream() {
    this.__locationDataStream =
      this.__locationCreateEventStream
        .filter(propEq('eventType', this.__LOCATION_CREATED))
        .map(({locationData}) => locationData)
        .publish();

    this.__locationDataStream.connect();
  }


  _initSelectedLocationStream() {
    this.__selectedLocationStream =
      this.__locationDataStream
        .map(({selectedLocation}) => selectedLocation)
        .publish();

    this.__selectedLocationStream.connect();
  }


  _initLocationsStream() {
    this.__locationsStream =
      this.__locationDataStream
        .map(({locations}) => locations)
        .publish();

    this.__locationsStream.connect();
  }
}
