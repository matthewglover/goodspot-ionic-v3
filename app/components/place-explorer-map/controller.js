

export default class PlaceExplorerController {


  __placesStream
  __positionStream


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initPlacesStream(gsPlaceSearchManager.placesStream);
    this._initPositionStream(gsLocationManager.selectedLocationStream);
  }


  get placesStream() {
    return this.__placesStream;
  }


  get positionStream() {
    return this.__positionStream;
  }


  _initPlacesStream(placesStream) {
    this.__placesStream = placesStream;
  }


  _initPositionStream(selectedLocationStream) {
    this.__positionStream =
      selectedLocationStream
        .map(({pos}) => pos)
        .publish();

    this.__positionStream.connect();
  }
}
