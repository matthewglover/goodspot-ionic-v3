import {MAP_BOX_ACCESS_TOKEN, MAP_BOX_ID, MAP_BOX_OPTIONS, DEFAULT_ZOOM} from './config';
import {isNil, pipe, pick} from 'ramda';


const homeMarkerOptions = (isDraggable) =>
  ({
    icon: L.mapbox.marker.icon({ 'marker-color': '#CC0033', 'marker-symbol': 'building'}),
    title: 'Home',
    draggable: isDraggable
  });


export default class Map {

  __scope
  __domElement
  __$timeout

  __map
  __zoom
  __homeMarker

  constructor(scope, domElement, $timeout) {
    this.__scope = scope;
    this.__domElement = domElement;
    this.__zoom = DEFAULT_ZOOM;
    this.__$timeout = $timeout;


    this._bindMapPositionStream();
    this._initUpdateViewListener();
  }


  get isDraggable() {
    return (isNil(this.__scope.positionDraggable)) ?
      false :
      this.__scope.positionDraggable;
  }


  set __position(pos) {
    if (isNil(this.__map)) this._buildMap();

    this.__map.setView(pos, this.__zoom);
    this._setHomeMarker(pos);
  }


  set __positionStream(positionStream) {
    positionStream.subscribe(pos => this.__position = pos);
  }


  // Deals with issues on refocus
  // (see https://github.com/Leaflet/Leaflet/issues/2826)
  // Must run after map shown, so run at end of event loop
  _invalidateSize() {
    this.__$timeout(_ => this.__map.invalidateSize());
  }


  _buildMap() {
    L.mapbox.accessToken = MAP_BOX_ACCESS_TOKEN;
    this.__map = L.mapbox.map(this.__domElement, MAP_BOX_ID, MAP_BOX_OPTIONS);
    this.__scope.map = this.__map;
    this.__$timeout(_ => this._invalidateSize());
  }


  _setHomeMarker(pos) {
    if (isNil(this.__homeMarker)) this._buildHomeMarker(pos);
    else this.__homeMarker.setLatLng(pos);
  }


  _buildHomeMarker(pos) {
    this.__homeMarker = L.marker(pos, homeMarkerOptions(this.isDraggable));

    if (this.isDraggable)
      this._addDragEndEmitter(this.__homeMarker, 'map:home-marker:dragend');

    this.__homeMarker.addTo(this.__map);
  }


  _addDragEndEmitter(marker, eventName) {
    const getPos = pipe(
      evt => evt.target.getLatLng(),
      pick(['lat', 'lng']),
      ({lat, lng}) => [lat, lng]
    );

    marker.on('dragend', evt => this.__scope.$emit(eventName, getPos(evt)));
  }


  _bindMapPositionStream() {
    const unWatch =
      this.__scope.$watch('positionStream', () => {
        if (isNil(this.__scope.positionStream)) return;
        unWatch();
        this.__positionStream = this.__scope.positionStream;
      });
  }


  _initUpdateViewListener() {
    this.__scope.$on('map:updateView', () => {
      console.log('updating map view...');
      if (isNil(this.__map)) return;
      this._invalidateSize();
    })
  }
}
