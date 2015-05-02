import Rx from 'rxjs/dist/rx.lite';



const transformPlaces = ({pos}, places) => {
  console.log(pos, places);
};



export default class PlaceExplorerDataService {

  __placesStream
  __positionStream

  __crntPosition


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initPlacesStream(gsPlaceSearchManager.placesStream);
    this._initPositionStream(gsLocationManager.selectedLocationStream);

    this._sortStream();
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


  _sortStream() {
    this.placesStream
      .subscribe(({location, places}) => transformPlaces(location, places));
  }
}
