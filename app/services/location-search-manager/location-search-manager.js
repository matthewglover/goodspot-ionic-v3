


export default class LocationSearchManager {


  __gsGeocoder
  __locationSearchResultsStream

  constructor({gsLocationSearchEventListener, gsGeocoder}) {
    this.__gsGeocoder = gsGeocoder;
    this._reactToLocationSearchEvents(gsLocationSearchEventListener);
  }


  get locationSearchResultsStream() {
    return this.__locationSearchResultsStream;
  }


  _reactToLocationSearchEvents(gsLocationSearchEventListener) {
    this.__locationSearchResultsStream =
      gsLocationSearchEventListener
        .eventStream
        .flatMap(searchText => this._geocode(searchText));
  }


  _geocode(searchText) {
    return this.__gsGeocoder.geocode(searchText);
  }
}
