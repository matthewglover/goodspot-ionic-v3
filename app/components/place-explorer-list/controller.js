


export default class PlaceExplorerListController {


  __places


  constructor() {
    this._initPlaces();
  }


  get places() {
    return this.__places;
  }


  _initPlaces() {
    this.placesStream
      .map(({places}) => places)
      .subscribe(places => this.__places = places);
  }
}
