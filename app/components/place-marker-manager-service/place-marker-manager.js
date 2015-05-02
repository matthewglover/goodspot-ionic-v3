import {forEach, isNil} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';
import {findDeleteIds, findChangePlaces, findCreatePlaces} from './helpers';
import getBounds from './get-bounds';






export default class PlaceMarkerManager {

  __gsPlaceMarkerFactory

  __placesStream

  __markerLayer
  __markers

  __crntPlaces
  __crntPos

  constructor({gsPlaceMarkerFactory}) {
    this.__gsPlaceMarkerFactory = gsPlaceMarkerFactory;

    this.__markers = {};

    this._initActionStream();
  }


  set placesStream(placesStream) {
    placesStream.subscribe(places => this._updatePlaces(places));
  }


  set positionStream(positionStream) {
    positionStream.subscribe(pos => this.__crntPos = pos);
  }

  get MARKER_UPDATE() {
    return `MARKER_UPDATE`;
  }


  get INIT_MARKER_LAYER() {
    return `INIT_MARKER_LAYER`;
  }


  get actionStream() {
    return this.__actionStream;
  }


  _initActionStream() {
    this.__actionStream = new Rx.Subject();
  }


  _initMarkerLayer() {
    this.__markerLayer = new L.MarkerClusterGroup();

    this.actionStream.onNext({
      eventType: this.INIT_MARKER_LAYER,
      markerLayer: this.__markerLayer
    });
  }


  _updatePlaces(places) {

    if (isNil(this.__crntPlaces)) {
      this._createMarkers(places);
    } else {
      const deleteIds = findDeleteIds(this.__crntPlaces, places);
      this._deleteMarkers(deleteIds);

      const changePlaces = findChangePlaces(this.__crntPlaces, places);
      this._updateMarkers(changePlaces);

      const createPlaces = findCreatePlaces(this.__crntPlaces, places);
      this._createMarkers(createPlaces);
    }

    this.__crntPlaces = places;


    this.actionStream.onNext({
      eventType: this.MARKER_UPDATE,
      pos: this.__crntPos,
      markerBounds: getBounds(this.__markers)
    });
  }


  _createMarkers(places) {
    forEach(place => this._createMarker(place))(places);
  }


  _createMarker(place) {
    const marker = this.__gsPlaceMarkerFactory(place);
    this.__markers[place.id] = marker;
    this._addMarkerToLayer(marker);
  }


  _deleteMarkers(placeIds) {
    forEach(placeId => this._deleteMarker(placeId))(placeIds);
  }


  _deleteMarker(placeId) {
    const marker = this.__markers[placeId];
    this._removeMarkerFromLayer(marker);
    delete this.__markers[placeId];
  }


  _updateMarkers(changePlaces) {
    forEach(placePair => this._updateMarker(placePair))(changePlaces);
  }


  _updateMarker([oldPlace, newPlace]) {
    const marker = this.__markers[oldPlace.id];
    marker.place = newPlace;
    this.__markers[newPlace.id] = marker;
    delete this.__markers[oldPlace.id];
  }


  _addMarkerToLayer(marker) {
    if (isNil(this.__markerLayer)) this._initMarkerLayer();
    this.__markerLayer.addLayer(marker.mapMarker);
  }


  _removeMarkerFromLayer(marker) {
    this.__markerLayer.removeLayer(marker.mapMarker);
    delete marker.mapMarker;
  }
}
