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
    this.__searchResultsStream = new Rx.ReplaySubject(1);

    searchResultsStream
      .subscribe(searchResults => this.__searchResultsStream.onNext(searchResults));
  }


  _initPositionStream(selectedLocationStream) {
    this.__positionStream = new Rx.ReplaySubject(1);

    const rawStream =
      selectedLocationStream
        .map(({pos}) => pos)
        .publish();

    rawStream
      .connect();

    rawStream
      .subscribe(pos => this.__positionStream.onNext(pos));
  }
}
