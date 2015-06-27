

export default class PlaceExplorerListController {


  __places


  constructor($scope) {
    this._initPlaces();
  }


  get places() {
    return this.__places;
  }


  _initPlaces() {
    const placesStream =
      this.searchResultsStream
        .map(({places}) => places)
        .subscribe(places => {
          this.__places = places;
        });
  }
}
