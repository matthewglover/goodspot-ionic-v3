import {propEq, prop, eqDeep, not, isNil, complement} from 'ramda';

const isNotNil = complement(isNil);

export default class MapPlacesController {

  __$scope
  __$interval
  __gsPlaceMarkerManager

  __mapController


  constructor($scope, $interval, gsPlaceMarkerManagerFactory) {
    this.__$scope = $scope;
    this.__$interval = $interval;

    this._initMapRef();
    this._initPlaceMarkerManager(gsPlaceMarkerManagerFactory);
    this._reactToMarkerUpdate();
    this._reactToDefaultZoom();
  }



  get __map() {
    if (isNil(this.__mapController) ||
        isNil(this.__mapController.map)) return;

    return this.__mapController.map;
  }


  get __MARKER_UPDATE() {
    return this.__gsPlaceMarkerManager.MARKER_UPDATE;
  }


  get __INIT_MARKER_LAYER() {
    return this.__gsPlaceMarkerManager.INIT_MARKER_LAYER;
  }


  get __DEFAULT_ZOOM() {
    return this.__gsPlaceMarkerManager.DEFAULT_ZOOM;
  }


  _setDefaultMapView(location) {
    this.__mapController.setDefaultView(location.pos);
  }


  _initMapRef() {
    const unWatch =
      this.__$scope.$watch('__mapController', (mapController) => {
        if (isNil(mapController)) return;
        unWatch();
        this.__mapController = mapController;
      });
  }


  _initPlaceMarkerManager(gsPlaceMarkerManagerFactory) {
    this.__gsPlaceMarkerManager = gsPlaceMarkerManagerFactory();
    this._reactToInitMarkerLayer();
    this.__gsPlaceMarkerManager.searchResultsStream = this.searchResultsStream;
  }


  _reactToInitMarkerLayer() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__INIT_MARKER_LAYER))
      .map(prop('markerLayer'))
      .subscribe(markerLayer => this._addMarkerLayerToMap(markerLayer));
  }


  _addMarkerLayerToMap(markerLayer) {
    if (isNotNil(this.__map)) {
      this.__map.addLayer(markerLayer);
    } else {
      const stop = this.__$interval(_ => {
        if(isNil(this.__map)) return;
        this.__map.addLayer(markerLayer);
        this.__$interval.cancel(stop);
      }, 1);
    }
  }


  _reactToMarkerUpdate() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__MARKER_UPDATE))
      .map(prop('markerBounds'))
      .subscribe(markerBounds => this._fitMapToMarkerBounds(markerBounds));
  }


  _fitMapToMarkerBounds(markerBounds) {
    if (isNotNil(this.__map)) {
      this.__map.fitBounds(markerBounds);
    } else {
      const stop = this.__$interval(_ => {
        if(isNil(this.__map)) return;
        this.__map.fitBounds(markerBounds);
        this.__$interval.cancel(stop);
      }, 1);
    }
  }


  _reactToDefaultZoom() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__DEFAULT_ZOOM))
      .map(prop('location'))
      .subscribe(location => this._setDefaultMapView(location));
  }
}
