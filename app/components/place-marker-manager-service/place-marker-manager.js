import {forEach, values, pipe} from 'ramda';


export default class PlaceMarkerManager {

  __gsPlaceMarkerFactory

  __markerLayer
  __markers

  constructor({gsPlaceMarkerFactory}) {
    this.__gsPlaceMarkerFactory = gsPlaceMarkerFactory;

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
    const marker = this.__gsPlaceMarkerFactory(place);
    this.__markers[marker.id] = marker;
  }


  _updateMarkerLayer() {
    pipe(
      values,
      forEach(m => this._addMarkerToLayer(m))
    )(this.__markers);
  }


  _addMarkerToLayer(m) {
    this.__markerLayer.addLayer(m.mapMarker);
  }
}
