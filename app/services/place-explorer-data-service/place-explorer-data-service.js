import Rx from 'rxjs/dist/rx.lite';
import {append, reduce} from 'ramda';


const applyFilter = (places, filter) => filter(places);


export default class PlaceExplorerDataService {

  __searchResultsStream
  __positionStream

  __filterStream

  __filters

  __crntPosition


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initFilterStream();
    this._initSearchResultsStream(gsPlaceSearchManager.searchResultsStream);
    this._initPositionStream(gsLocationManager.selectedLocationStream);
  }


  get searchResultsStream() {
    return this.__searchResultsStream;
  }


  get positionStream() {
    return this.__positionStream;
  }


  set filters(filters) {
    this.__filters = filters;
    this.__filterStream.onNext(this.__filters);
  }


  addFilter(filter) {
    this.__filters = append(filter, this.__filters);
    this.__filterStream.onNext(this.__filters);
  }


  _initSearchResultsStream(searchResultsStream) {
    this.__searchResultsStream = new Rx.ReplaySubject(1);

    const filteredResultsStream =
      Rx.Observable.combineLatest(
        searchResultsStream,
        this.__filterStream,
        (a, b) => [a, b]
      );

    filteredResultsStream
      .subscribe(([searchResults, filters]) => this._updateSearchResults(searchResults, filters));

    // searchResultsStream
    //   .subscribe(searchResults => this.__searchResultsStream.onNext(searchResults));
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


  _initFilterStream() {
    this.__filters = [];

    this.__filterStream =
      new Rx.ReplaySubject(1);

    this.__filterStream
      .onNext(this.__filters);
  }


  _updateSearchResults({location, places}, filters) {
    this.__searchResultsStream
      .onNext({
        location,
        places: reduce(applyFilter, places, filters)
      });
  }
}
