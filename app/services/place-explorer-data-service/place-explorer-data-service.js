import Rx from 'rxjs/dist/rx.lite';




export default class PlaceExplorerDataService {

  __searchResultsStream
  __positionStream

  __crntPosition


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initSearchResultsStream(gsPlaceSearchManager.searchResultsStream);
    this._initPositionStream(gsLocationManager.selectedLocationStream);
  }


  get searchResultsStream() {
    return this.__searchResultsStream;
  }


  get positionStream() {
    return this.__positionStream;
  }


  _initSearchResultsStream(searchResultsStream) {
    console.log('))', searchResultsStream);
    this.__searchResultsStream = searchResultsStream;
  }


  _initPositionStream(selectedLocationStream) {
    this.__positionStream =
      selectedLocationStream
        .map(({pos}) => pos)
        .publish();

    this.__positionStream.connect();
  }
  //
  //
  // _sortStream() {
  //   this.searchResultsStream
  //     .subscribe(({location, places}) => transformPlaces(location, places));
  // }
}
