import {forEach, isNil, not, eqDeep} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';
import {findDeleteIds, findChangePlaces, findCreatePlaces} from './helpers';
import getBounds from './get-bounds';






export default class PlaceMarkerManager {

  __gsPlaceMarkerFactory

  __markerLayer
  __markers

  __crntSearchResults

  __actionStream

  constructor({gsPlaceMarkerFactory}) {
    this.__gsPlaceMarkerFactory = gsPlaceMarkerFactory;

    this.__markers = {};

    this._initActionStream();
  }


  set searchResultsStream(searchResultsStream) {
    searchResultsStream
      .subscribe(searchResults => this._updateResults(searchResults));
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

    this.__actionStream = new Rx.ReplaySubject(2);

    this.__inputStream
      .subscribe((...args) => this.__actionStream.onNext(...args));
  }


  _initMarkerLayer() {
    this.__markerLayer = new L.MarkerClusterGroup();

    this.__inputStream.onNext({
      eventType: this.INIT_MARKER_LAYER,
      markerLayer: this.__markerLayer
    });
  }


  _updateResults(searchResults) {
    const newPlaces = searchResults.places;

    if (isNil(this.__crntSearchResults))
      this._createMarkers(newPlaces);
    else
      this._mergeMarkers(newPlaces)

    if (this._isNewSearchLocation(searchResults))
      this._emitMarkerUpdateAction(searchResults.location);

    this.__crntSearchResults = searchResults;
  }


  _isNewSearchLocation(searchResults) {
    return isNil(this.__crntSearchResults) ||
      isNil(this.__crntSearchResults.location) ||
      not(eqDeep(this.__crntSearchResults.location, searchResults.location));
  }


  _emitMarkerUpdateAction(location) {
    this.__inputStream.onNext({
      eventType: this.MARKER_UPDATE,
      location: location,
      markerBounds: getBounds(this.__markers)
    });
  }


  _mergeMarkers(newPlaces) {
    const crntPlaces = this.__crntSearchResults.places;

    const deleteIds = findDeleteIds(crntPlaces, newPlaces);
    this._deleteMarkers(deleteIds);

    const changePlaces = findChangePlaces(crntPlaces, newPlaces);
    this._updateMarkers(changePlaces);

    const createPlaces = findCreatePlaces(crntPlaces, newPlaces);
    this._createMarkers(createPlaces);
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
