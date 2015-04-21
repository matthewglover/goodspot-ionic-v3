import {IONIC_COLORS} from '../../app-constants';


const markerColor = (place) => {
  if (place.isMyGoodspot) return IONIC_COLORS.$assertive;
  // if (Place.isFriendspot(place)) return IONIC_COLORS.$energized;
  // if (Place.isGoodspot(place)) return IONIC_COLORS.$positive;
  return IONIC_COLORS.$stable;
}


const buildPlaceMarkerIcon = (place) =>
  L.mapbox.marker.icon({
    'marker-size': 'large',
    'marker-symbol': 'marker-stroked',
    'marker-color': markerColor(place)
  });


const POPUP_HTML =
  `<div>
    <gs-map-place-details
      place="place"
      places-key="placesKey"
      popup="popup" marker="marker"></gs-map-place-details>
   </div>`;


export default class PlaceMarker {

  __$compile
  __$rootScope
  __place
  __marker
  __popup
  __popupScope
  __popupLinkFn
  __popupDirective


  constructor($compile, $rootScope, place) {
    console.log(`Building marker for ${place.name}`);

    this.__$compile = $compile;
    this.__$rootScope = $rootScope;
    this.__place = place;

    this.__marker = this._buildMarker();

    this.__popupScope = this._buildPopupScope();
    this.__popupLinkFn = this._buildPopupLinkFn();
    this.__popupDirective = this._buildPopupDirective();
    this.__popup = this._buildPopup();
    this._setPopupContent();
    this._bindPopup();
  }


  get id() {
    if (this.placeType === 'factual')
      return this.__place.id;
    else if (this.placeType === 'goodspot')
      return this.__place._uid;
    else
      throw new TypeError('Unhandled placeType');
  }


  get placeType() {
    return this.__place.placeType;
  }


  get name() {
    return this.__place.name;
  }


  get pos() {
    return this.__place.pos;
  }


  get __popupContentElement() {
    return this.__popupDirective[0];
  }


  get marker() {
    return this.__marker;
  }


  _buildMarker() {
    const markerOptions = {
      title: this.name,
      icon: buildPlaceMarkerIcon(this.__place)
    };

    return L.marker(this.pos, markerOptions);
  }


  _buildPopup() {
    return L.popup({closeButton: false});
  }


  _buildPopupScope() {
    return angular.extend(this.__$rootScope.$new(), {place: this.__place});
  }


  _buildPopupLinkFn() {
    return this.__$compile(angular.element(POPUP_HTML));
  }


  _buildPopupDirective() {
    return this.__popupLinkFn(this.__popupScope);
  }


  _setPopupContent() {
    this.__popup.setContent(this.__popupContentElement);
  }


  _bindPopup() {
    this.__marker.bindPopup(this.__popup);
  }
}
