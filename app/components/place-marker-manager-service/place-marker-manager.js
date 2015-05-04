import {forEach, isNil, eqDeep, not} from 'ramda';
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


  setStreams(positionStream, placesStream) {
    const comboStream =
      Rx.Observable.combineLatest(
        positionStream,
        placesStream,
        (a, b) => [a, b]
      );

    comboStream
      .filter((pos, places) => not(eqDeep(this.__crntPlaces, places)))
      .subscribe((pos, places) => this._updatePlaces(pos, places));
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
    this.__inputStream = new Rx.Subject();

    this.__actionStream =
      this.__inputStream
        .publish();
    this.__actionStream.connect();
  }


  _initMarkerLayer() {
    this.__markerLayer = new L.MarkerClusterGroup();

    this.__inputStream.onNext({
      eventType: this.INIT_MARKER_LAYER,
      markerLayer: this.__markerLayer
    });
  }


  _updatePlaces([pos, places]) {
    console.log('new places:', this.__crntPos , pos, places);
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

    if (not(eqDeep(this.__crntPos, pos))) this._updatePos(pos);
  }


  _updatePos(pos) {
    this.__crntPos = pos;

    this.__inputStream.onNext({
      eventType: this.MARKER_UPDATE,
      pos: pos,
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
