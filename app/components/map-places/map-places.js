import {propEq, prop, eqDeep, not} from 'ramda';


export default class MapPlaces {

  __scope
  __mapController

  __gsPlaceMarkerManager
  __crntLocation


  constructor({scope, mapController, gsPlaceMarkerManager}) {
    this.__scope = scope;
    this.__mapController = mapController;
    this.__gsPlaceMarkerManager = gsPlaceMarkerManager;

    this._bindPlacesStream();

    this._reactToInitMarkerLayer();
    this._reactToMarkerUpdate();
  }


  get __map() {
    return this.__mapController.map;
  }


  _initMapMarkerLayer(markerLayer) {
    this.__map.addLayer(markerLayer);
  }


  _fitMapToMarkerBounds(markerBounds) {
    this.__map.fitBounds(markerBounds);
  }


  _reactToInitMarkerLayer() {
    this.__gsPlaceMarkerManager.actionStream
        .filter(propEq('eventType', this.__gsPlaceMarkerManager.INIT_MARKER_LAYER))
        .map(prop('markerLayer'))
        .subscribe(markerLayer => this._initMapMarkerLayer(markerLayer));
  }


  _reactToMarkerUpdate() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__gsPlaceMarkerManager.MARKER_UPDATE))
      .filter(({location}) => not(eqDeep(location, this.__crntLocation)))
      .do(({location}) => this.__crntLocation = location)
      .map(prop('markerBounds'))
      .subscribe(markerBounds => this._fitMapToMarkerBounds(markerBounds));
  }


  _bindPlacesStream() {
    const unWatch =
      this.__scope.$watch('placesStream', () => {
        unWatch();
        this.__gsPlaceMarkerManager.placesStream = this.__scope.placesStream;
      });
  }
}
