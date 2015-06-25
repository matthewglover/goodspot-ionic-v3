import {
  MAP_BOX_ACCESS_TOKEN,
  MAP_BOX_ID,
  MAP_BOX_OPTIONS,
  DEFAULT_ZOOM
} from '../../config';

import {isNil, pipe, pick} from 'ramda';


const getPos = pipe(
  evt => evt.target.getLatLng(),
  pick(['lat', 'lng']),
  ({lat, lng}) => [lat, lng]
);



const homeMarkerOptions = (isDraggable) =>
  ({
    icon: L.mapbox.marker.icon({ 'marker-color': '#CC0033', 'marker-symbol': 'building'}),
    title: 'Home',
    draggable: isDraggable
  });


export default class MapController {

  __$scope
  __$timeout
  __map
  __homeMarker

  constructor($scope, $timeout) {
    L.mapbox.accessToken = MAP_BOX_ACCESS_TOKEN;
    
    this.__$scope = $scope;
    this.__$timeout = $timeout;

    this._initListener();
    this._initUpdateViewListener();
  }


  get map() {
    return this.__map;
  }


  setDefaultView(pos) {
    this._setView(pos, DEFAULT_ZOOM);
  }

  _setView(pos, zoom) {
    this.__map.setView(pos, zoom);
  }


  _setPosition(pos) {
    this.setDefaultView(pos);
    this._setHomeMarker(pos);
  }


  _setHomeMarker(pos) {
    if (isNil(this.__homeMarker)) this._buildHomeMarker(pos);
    else this.__homeMarker.setLatLng(pos);
  }


  _initListener() {
    const unsubscribe =
      this.__$scope.$on('map:loaded', (_, domElement) => {
        unsubscribe();
        this._initMap(domElement);
      });
  }


  _initUpdateViewListener() {
    this.__$scope.$on('map:updateView', () => {
      if (isNil(this.__map)) return;
      this._invalidateSize();
    })
  }


  _initMap(domElement) {
    this._buildMap(domElement);

    this.positionStream
      .subscribe(pos => this._setPosition(pos));
  }


  _buildMap(domElement) {
    // L.mapbox.accessToken = MAP_BOX_ACCESS_TOKEN;
    this.__map = L.mapbox.map(domElement, MAP_BOX_ID, MAP_BOX_OPTIONS);
    this._invalidateSize();
  }


  _buildHomeMarker(pos) {
    this.__homeMarker =
      L.marker(pos, homeMarkerOptions(this.positionDraggable));

    if (this.positionDraggable)
      this._addDragEndEmitter(this.__homeMarker, 'map:home-marker:dragend');

    this.__homeMarker.addTo(this.__map);
  }


  _addDragEndEmitter(marker, eventName) {
    marker.on(
      'dragend',
      evt => this.__$scope.$emit(eventName, getPos(evt))
    );
  }


  // Deals with issues on refocus
  // (see https://github.com/Leaflet/Leaflet/issues/2826)
  // Must run after map shown, so run at end of event loop
  _invalidateSize() {
    this.__$timeout(_ => this.__map.invalidateSize());
  }
}
