import {propEq, prop, eqDeep, not, isNil} from 'ramda';


export default class MapPlacesController {

  __$scope
  __gsPlaceMarkerManager

  __mapController
  __crntLocation


  constructor($scope, $timeout, gsPlaceMarkerManager) {
    this.__$scope = $scope;

    this._initMapRef();
    this._initPlaceMarkerManager(gsPlaceMarkerManager);
    this._reactToMarkerUpdate();
  }



  get __map() {
    if (isNil(this.__mapController) ||
        isNil(this.__mapController.map))
      throw new Error('Timing error: calling map before its set');

    return this.__mapController.map;
  }


  _initMapRef() {
    const unWatch =
      this.__$scope.$watch('__mapController', (mapController) => {
        if (isNil(mapController)) return;
        unWatch();
        this.__mapController = mapController;
      });
  }


  _initPlaceMarkerManager(gsPlaceMarkerManager) {
    this.__gsPlaceMarkerManager = gsPlaceMarkerManager;
    this.__gsPlaceMarkerManager.searchResultsStream = this.searchResultsStream;
    this._reactToInitMarkerLayer();
  }


  _reactToInitMarkerLayer() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__gsPlaceMarkerManager.INIT_MARKER_LAYER))
      .map(prop('markerLayer'))
      .subscribe(markerLayer => this._addMarkerLayerToMap(markerLayer));
  }


  _addMarkerLayerToMap(markerLayer) {
    this.__map.addLayer(markerLayer);
  }


  _reactToMarkerUpdate() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__gsPlaceMarkerManager.MARKER_UPDATE))
      .filter(({location}) => not(eqDeep(location, this.__crntLocation)))
      .do(({location}) => this.__crntLocation = location)
      .map(prop('markerBounds'))
      .subscribe(markerBounds => this._fitMapToMarkerBounds(markerBounds));
  }


  _fitMapToMarkerBounds(markerBounds) {
    this.__map.fitBounds(markerBounds);
  }
}
