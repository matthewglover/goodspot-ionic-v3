import {propEq, prop, eqDeep, not, isNil} from 'ramda';


export default class MapPlacesController {

  __$scope
  __gsPlaceMarkerManager

  __mapController
  __crntPos


  constructor($scope, $interval, gsPlaceMarkerManager) {
    console.log('Initialising map places controller...');
    this.__$scope = $scope;
    this.__$interval = $interval;

    this._initMapRef();
    this._initPlaceMarkerManager(gsPlaceMarkerManager());
    this._reactToMarkerUpdate();
  }



  get __map() {
    if (isNil(this.__mapController) ||
        isNil(this.__mapController.map))
      return undefined;

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
    // this.__gsPlaceMarkerManager.placesStream = this.placesStream;
    // this.__gsPlaceMarkerManager.positionStream = this.positionStream;

    this._reactToInitMarkerLayer();
    this.__gsPlaceMarkerManager.setStreams(this.positionStream, this.placesStream);
  }


  _reactToInitMarkerLayer() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__gsPlaceMarkerManager.INIT_MARKER_LAYER))
      .map(prop('markerLayer'))
      .subscribe(markerLayer => this._addMarkerLayerToMap(markerLayer));
  }


  _addMarkerLayerToMap(markerLayer) {
    const stop = this.__$interval(_ => {
      if(isNil(this.__map)) return;
      this.__map.addLayer(markerLayer);
      this.__$interval.cancel(stop);
    }, 1);
  }


  _reactToMarkerUpdate() {
    this.__gsPlaceMarkerManager.actionStream
      .filter(propEq('eventType', this.__gsPlaceMarkerManager.MARKER_UPDATE))
      .do(d => console.log('-->', d))
      .filter(({pos}) => not(eqDeep(pos, this.__crntPos)))
      .do(({pos}) => this.__crntPos = pos)
      .map(prop('markerBounds'))
      .subscribe(markerBounds => this._fitMapToMarkerBounds(markerBounds));
  }


  _fitMapToMarkerBounds(markerBounds) {
    this.__map.fitBounds(markerBounds);
  }
}
