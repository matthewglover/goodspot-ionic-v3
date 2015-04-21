import {forEach, values, pipe} from 'ramda';
import PlaceMarker from './place-marker';


export default class PlaceMarkersManager {

  __$compile
  __$rootScope

  __markerLayer
  __markers


  constructor({$rootScope, $compile}) {
    console.log('Initialising PlaceMarkersManager');

    this.__$compile = $compile;
    this.__$rootScope = $rootScope;


    this.__markerLayer = new L.MarkerClusterGroup();
    this.__markers = {};
  }


  get markerLayer() {
    return this.__markerLayer;
  }


  updateMarkers(places) {
    forEach(place => this._buildMarker(place))(places);

    this._updateMarkerLayer();
  }


  _buildMarker(place) {
    const marker = new PlaceMarker(this.__$compile, this.__$rootScope, place);
    this.__markers[marker.id] = marker;
  }


  _updateMarkerLayer() {
    pipe(
      values,
      forEach(m => this._addMarkerToLayer(m))
    )(this.__markers);
  }


  _addMarkerToLayer(m) {
    this.__markerLayer.addLayer(m.marker);
  }
}
