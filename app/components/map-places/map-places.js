

export default class MapPlaces {

  __scope
  __mapController
  __gsMapPlacesHelperService

  __placeMarkerLayer

  constructor({scope, mapController, gsMapPlacesHelperService}) {
    this.__scope = scope;
    this.__mapController = mapController;
    this.__gsMapPlacesHelperService = gsMapPlacesHelperService;

    this._bindPlacesStream();
  }


  get map() {
    return this.__mapController.map;
  }


  _bindPlacesStream() {
    this.__scope.$watch('placesStream', () => this._updatePlacesStream());
  }


  _updatePlacesStream() {
    const placesStream = this.__scope.placesStream;

    placesStream
      .forEach(places => this._updatePlaceMarkers(places));
  }


  _updatePlaceMarkers(places) {
    const placeMarkerLayer = this._buildPlaceMarkerLayer(places);

    this.map.addLayer(placeMarkerLayer);
    this.map.fitBounds(placeMarkerLayer.getBounds());
  }


  _buildPlaceMarkerLayer(places) {
    return this.__gsMapPlacesHelperService.buildPlaceMarkerLayer(places);
  }
}
