import {MAP_BOX_ACCESS_TOKEN, MAP_BOX_ID, MAP_BOX_OPTIONS, DEFAULT_ZOOM} from './config';
import {isNil} from 'ramda';


const homeMarkerOptions = (isDraggable) =>
  ({
    icon: L.mapbox.marker.icon({ 'marker-color': '#CC0033', 'marker-symbol': 'building'}),
    title: 'Home',
    draggable: isDraggable
  });


export default class Map {

  __scope
  __domElement

  __map
  __zoom
  __homeMarker

  constructor(scope, domElement) {
    this.__scope = scope;
    this.__domElement = domElement;
    this.__zoom = DEFAULT_ZOOM;
  }


  set position(pos) {
    if (isNil(this.__map)) this._buildMap();

    this.__map.setView(pos, this.__zoom);
    this._setHomeMarker(pos);
  }


  invalidateSize() {
    this.__map.invalidateSize();
  }


  _buildMap() {
    L.mapbox.accessToken = MAP_BOX_ACCESS_TOKEN;
    this.__map = L.mapbox.map(this.__domElement, MAP_BOX_ID, MAP_BOX_OPTIONS);
    this.__scope.map = this.__map;
  }


  _setHomeMarker(pos) {
    if (isNil(this.__homeMarker)) this._buildHomeMarker(pos);
    else this.__homeMarker.setLatLng(pos);
  }


  _buildHomeMarker(pos, isDraggable = false) {
    this.__homeMarker = L.marker(pos, homeMarkerOptions(isDraggable));

    if (isDraggable) this._addDragEndEmitter(this.__homeMarker, 'map:home-marker:dragend');

    this.__homeMarker.addTo(this.__map);
  }


  _addDragEndEmitter(marker, eventName) {
    marker.on('dragend', event => this.__scope.$emit(eventName, event));
  }
}
