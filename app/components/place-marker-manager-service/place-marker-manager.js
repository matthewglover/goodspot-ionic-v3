import {forEach, isNil, not, eqDeep, isEmpty, complement, evolve, always} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';
import {
  findDeleteIds,
  findFactualToGoodspotChangePlaces,
  findCreatePlaces,
  findGoodspotDetailChangePlaces
} from './helpers';
import getBounds from './get-bounds';


const isNotEmpty = complement(isEmpty);


const isSamePlaceData = (oldPlace, newPlace) => {
  const compareOldPlace = evolve({$$hashKey: always(undefined)}, oldPlace);
  const compareNewPlace = evolve({$$hashKey: always(undefined)}, newPlace);
  return eqDeep(compareOldPlace, compareNewPlace);
};


export default class PlaceMarkerManager {

  __gsPlaceMarkerFactory

  __markerLayer
  __markers

  __crntSearchResults

  __actionStream

  __selectPlaceHandler

  constructor({gsPlaceMarkerFactory, selectPlaceHandler}) {
    this.__gsPlaceMarkerFactory = gsPlaceMarkerFactory;
    this.__selectPlaceHandler = selectPlaceHandler;

    this.__markers = {};

    this._initActionStream();
  }


  set searchResultsStream(searchResultsStream) {
    this.__subscription =
      searchResultsStream
        .subscribe(searchResults => this._updateResults(searchResults));
  }


  get MARKER_UPDATE() {
    return `MARKER_UPDATE`;
  }


  get INIT_MARKER_LAYER() {
    return `INIT_MARKER_LAYER`;
  }


  get DEFAULT_ZOOM() {
    return 'DEFAULT_ZOOM';
  }


  get actionStream() {
    return this.__actionStream;
  }


  _initActionStream() {
    this.__inputStream = new Rx.Subject();

    this.__actionStream = new Rx.ReplaySubject(1);

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
    const {places, location } = searchResults;

    if (isNil(this.__crntSearchResults))
      this._createMarkers(places);
    else
      this._mergeMarkers(places)

    if (isEmpty(places))
      this._emitDefaultZoomAction(location);
    else if (this._isAmendedResultSet(location, places))
      this._emitMarkerUpdateAction(location);

    this.__crntSearchResults = searchResults;
  }


  _isAmendedResultSet(newLocation, newPlaces) {
    return this._isNewSearchLocation(newLocation) ||
      this._isUpdatedResultSet(newPlaces);
  }


  _isNewSearchLocation(newLocation) {
    return isNil(this.__crntSearchResults) ||
      isNil(this.__crntSearchResults.location) ||
      not(eqDeep(this.__crntSearchResults.location, newLocation));
  }


  _isUpdatedResultSet(newPlaces) {
    const crntPlaces = this.__crntSearchResults.places;

    const res = isNotEmpty(findDeleteIds(crntPlaces, newPlaces)) ||
      isNotEmpty(findCreatePlaces(crntPlaces, newPlaces));

    return res;
  }


  _emitDefaultZoomAction(location) {
    this.__inputStream.onNext({
      eventType: this.DEFAULT_ZOOM,
      location
    });
  }


  _emitMarkerUpdateAction(location) {
    this.__inputStream.onNext({
      eventType: this.MARKER_UPDATE,
      location: location,
      markerBounds: getBounds(this.__markers, location.pos)
    });
  }


  _mergeMarkers(newPlaces) {
    const crntPlaces = this.__crntSearchResults.places;

    const deleteIds = findDeleteIds(crntPlaces, newPlaces);
    this._deleteMarkers(deleteIds);

    const factualToGoodspotChangePlaces = findFactualToGoodspotChangePlaces(crntPlaces, newPlaces);
    this._updateMarkers(factualToGoodspotChangePlaces);

    const goodspotDetailChangePlaces = findGoodspotDetailChangePlaces(crntPlaces, newPlaces);
    this._updateMarkers(goodspotDetailChangePlaces);

    const createPlaces = findCreatePlaces(crntPlaces, newPlaces);
    this._createMarkers(createPlaces);
  }


  _createMarkers(places) {
    forEach(place => this._createMarker(place))(places);
  }


  _createMarker(place) {
    const marker = this.__gsPlaceMarkerFactory(place, this.__selectPlaceHandler);
    this.__markers[place.id] = marker;
    this._addMarkerToLayer(marker);
  }


  _deleteMarkers(placeIds) {
    forEach(placeId => this._deleteMarker(placeId))(placeIds);
  }


  _deleteMarker(placeId) {
    this._removeMarkerFromLayer(this.__markers[placeId]);
    this.__markers[placeId] = undefined;
    delete this.__markers[placeId];
  }


  _updateMarkers(changePlaces) {
    forEach(placePair => this._updateMarker(placePair))(changePlaces);
  }


  _updateMarker([oldPlace, newPlace]) {
    if (isSamePlaceData(oldPlace, newPlace)) return
    const marker = this.__markers[oldPlace.id];
    marker.place = newPlace;
    delete this.__markers[oldPlace.id];
    this.__markers[newPlace.id] = marker;
  }


  _addMarkerToLayer(marker) {
    if (isNil(this.__markerLayer)) this._initMarkerLayer();
    this.__markerLayer.addLayer(marker.mapMarker);
  }


  _removeMarkerFromLayer(marker) {
    this.__markerLayer.removeLayer(marker.mapMarker);
    delete marker.mapMarker;
  }


  kill() {
    this.__subscription.dispose();
    delete this.__markers;
    delete this.__markerLayer;
  }
}
