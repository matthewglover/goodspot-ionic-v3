

export default class ExploreLocationController {

  __activeLocationStream;
  __placesStream;
  __mapPosition

  constructor(gsLocationManager, gsPlaceSearchManager) {
    this.__activeLocationStream = gsLocationManager.activeLocationStream;
    this.__placesStream = gsPlaceSearchManager.placesStream;

    this._reactToActiveLocationStream();
    // this._reactToPlacesStream();
  }


  get mapPosition() {
    return this.__mapPosition;
  }


  get placesStream() {
    return this.__placesStream;
  }

  _reactToActiveLocationStream() {
    this.__activeLocationStream
      .forEach(location => this.__mapPosition = location.pos);
  }


  // _reactToPlacesStream() {
  //   this.__placesStream
  //     .forEach(places => this.__places = places);
  // }
}
