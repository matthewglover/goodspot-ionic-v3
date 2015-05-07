import Rx from 'rxjs/dist/rx.lite';
// import {reduce} from 'ramda';


// const applyFilter = (places, filter) => filter(places);


export default class PlaceExplorerListController {


  __places


  constructor() {
    this._initPlaces();
  }


  get places() {
    return this.__places;
  }


  _initPlaces() {
    const placesStream =
      this.searchResultsStream
        .map(({places}) => places)
        .subscribe(places => this.__places = places);

    // Rx.Observable
    //   .combineLatest(
    //     placesStream,
    //     this.filterStream,
    //     (a, b) => [a, b]
    //   )
    //   .subscribe(([places, filters]) => this._setPlaces(places, filters));
  }


  // _setPlaces(places) {
  //   // console.log(places);
  //   // console.log(filters);
  //   // const filteredPlaces =
  //   //   reduce(applyFilter, places, filters);
  //
  //   this.__places = places;
  // }
}
