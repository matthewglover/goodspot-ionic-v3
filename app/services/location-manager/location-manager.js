import {propEq, isNil, prop, complement, pipe} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


const isNotNil = complement(isNil);



const streamWithValue = (inputStream, value) => {
  const outputStream = Rx.Observable
    .just(value)
    .merge(inputStream);

  return outputStream;
};


export default class LocationManager {

  __gsLocationCreateEventListener
  __gsLocationDeleteEventListener
  __gsLocationEditEventListener

  __locationCreateEventStream
  __locationDeleteEventStream
  __locationEditEventStream

  __locationDataStream
  __selectedLocationStream
  __locationsStream
  __changeSelectedLocationStream
  __updateSelectedStream

  __selectedLocation
  __locations


  constructor(gsLocationCreateEventListener, gsLocationDeleteEventListener, gsLocationEditEventListener) {
    this.__gsLocationCreateEventListener = gsLocationCreateEventListener;
    this.__gsLocationDeleteEventListener = gsLocationDeleteEventListener;
    this.__gsLocationEditEventListener = gsLocationEditEventListener;

    this.__locationCreateEventStream = gsLocationCreateEventListener.eventStream;
    this.__locationDeleteEventStream = gsLocationDeleteEventListener.eventStream;
    this.__locationEditEventStream = gsLocationEditEventListener.eventStream;

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


  set selectedLocation(location) {
    this.__changeSelectedLocationStream.onNext(location);
  }



  get __LOCATION_CREATED() {
    return this.__gsLocationCreateEventListener.LOCATION_CREATED;
  }


  get __LOCATION_DELETED() {
    return this.__gsLocationDeleteEventListener.LOCATION_DELETED;
  }


  get __LOCATION_EDITED() {
    return this.__gsLocationEditEventListener.LOCATION_EDITED;
  }


  _initStreams() {
    this._initLocationDataStream();
    this._initSelectedLocationStream();
    this._initLocationsStream();
  }


  _initLocationDataStream() {
    this.__locationDataStream =
      this._locationCreatedStream()
        .merge(this._locationDeletedStream())
        .merge(this._locationEditedStream())
        .publish();

    this.__locationDataStream.connect();
  }


  _locationCreatedStream() {
    const createdStream =
      this.__locationCreateEventStream
        .filter(propEq('eventType', this.__LOCATION_CREATED))
        .map(prop('locationData'))
        .publish();

    createdStream.connect();

    return createdStream;
  }


  _locationDeletedStream() {
    const deletedStream =
      this.__locationDeleteEventStream
        .filter(propEq('eventType', this.__LOCATION_DELETED))
        .map(prop('locationData'))
        .publish();

    deletedStream.connect();

    return deletedStream;
  }


  _locationEditedStream() {
    const editedStream =
      this.__locationEditEventStream
        .filter(propEq('eventType', this.__LOCATION_EDITED))
        .map(prop('locationData'))
        .publish();

    editedStream.connect();

    return editedStream;
  }


  _initChangeSelectedLocationStream() {
    this.__changeSelectedLocationStream = new Rx.Subject();
  }


  _initUpdateSelectedStream() {
    this.__updateSelectedStream =
      this.__locationDataStream
        .filter(pipe(prop('selectedLocation'), isNotNil))
        .map(prop('selectedLocation'))
        .publish();

    this.__updateSelectedStream.connect();
  }


  _initSelectedLocationStream() {
    this._initChangeSelectedLocationStream();
    this._initUpdateSelectedStream();

    this.__selectedLocationStream =
      this.__changeSelectedLocationStream
        .merge(this.__updateSelectedStream)
        .do(selectedLocation => this.__selectedLocation = selectedLocation)
        .publish();

    this.__selectedLocationStream.connect();
  }


  _initLocationsStream() {
    this.__locationsStream =
      this.__locationDataStream
        .map(prop('locations'))
        .do(locations => this.__locations = locations)
        .publish();

    this.__locationsStream.connect();
  }
}
