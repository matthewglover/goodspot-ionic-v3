import Rx from 'rxjs/dist/rx.lite';
import {append, reduce, reject, flip, pipe, sort, isNil, identity} from 'ramda';


const applyFnToData = (data, fn) => fn(data);


const reduceApplyFn = flip(reduce(applyFnToData));


// const getMetersFrom = (place) =>
//   isNil(place.metersFrom) ?
//     0 :
//     place.metersFrom;
//
//
// const sortByDistance = sort((a, b) => getMetersFrom(a) - getMetersFrom(b));
//
//
// const getTotalSpots = (place) =>
//   isNil(place.totalSpots) ?
//     0 :
//     place.totalSpots;
//
//
// const sortByTotalSpots = sort((a, b) => getTotalSpots(b) - getTotalSpots(a));



export default class PlaceExplorerDataService {

  __searchResultsStream
  __positionStream

  __filters
  __filterStream

  __sortStream


  __crntPosition


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initFilterStream();
    this._initSortStream();
    this._initSearchResultsStream(gsPlaceSearchManager.searchResultsStream);
    this._initPositionStream(gsLocationManager.selectedLocationStream);
  }


  get searchResultsStream() {
    return this.__searchResultsStream;
  }


  get positionStream() {
    return this.__positionStream;
  }


  set sortFunction(sortFunction) {
    this.__sortStream
      .onNext(sortFunction);
  }


  clearFilters() {
    this.__filters = [];
    this.__filterStream.onNext(this.__filters);
  }


  addFilter(filter) {
    this.__filters = append(filter, this.__filters);
    this.__filterStream.onNext(this.__filters);
  }


  removeFilter(filter) {
    this.__filters = reject(f => f === filter)(this.__filters);
  }


  _initSearchResultsStream(searchResultsStream) {
    this.__searchResultsStream = new Rx.ReplaySubject(1);

    const filteredResultsStream =
      Rx.Observable.combineLatest(
        searchResultsStream,
        this.__filterStream,
        this.__sortStream,
        (a, b, c) => [a, b, c]
      );

    filteredResultsStream
      .subscribe(([searchResults, filters, sortFunctions]) =>
        this._updateSearchResults(searchResults, filters, sortFunctions));
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


  _initSortStream() {
    this.__sortStream =
      new Rx.ReplaySubject(1);
  }


  _updateSearchResults({location, places}, filters, sortFunction) {

    const applyFiltersThenSort = pipe(
      reduceApplyFn(filters),
      sortFunction
    );

    this.__searchResultsStream
      .onNext({
        location,
        places: applyFiltersThenSort(places)
      });
  }
}
