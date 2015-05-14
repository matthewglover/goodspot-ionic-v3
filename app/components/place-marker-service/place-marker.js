import {IONIC_COLORS} from '../../app-constants';


const markerColor = (place) => {
  if (place.isMyGoodspot) return IONIC_COLORS.$assertive;
  if (place.friendSpots && place.friendSpots > 0) return IONIC_COLORS.$energized;
  // if (Place.isGoodspot(place)) return IONIC_COLORS.$positive;
  return IONIC_COLORS.$stable;
}


const buildPlaceMarkerIcon = (place) =>
  L.mapbox.marker.icon({
   'marker-size': 'large',
   'marker-symbol': 'marker-stroked',
   'marker-color': markerColor(place)
  });


export default class PlaceMarker {

  __popup
  __place
  __mapMarker


  constructor(place, gsPlacePopupFactory) {
    this.__place = place;
    this.__popup = gsPlacePopupFactory(place);
    this.__mapMarker = this._buildMapMarker();

    this._bindPopupToMarker();
  }


  set place(place) {
    this.__place = place;
    this.__popup.place = place;
    this._updateIcon();
  }


  get mapMarker() {
    return this.__mapMarker;
  }


  get pos() {
    const {lat, lng} = this.mapMarker.getLatLng();
    return [lat, lng];
  }

  get id() {
    return this.__place.id;
  }


  _updateIcon() {
    this.__mapMarker.setIcon(buildPlaceMarkerIcon(this.__place));
  }


  _buildMapMarker() {
    const markerOptions = {
      title: this.__place.name,
      icon: buildPlaceMarkerIcon(this.__place)
    };

    return L.marker(this.__place.pos, markerOptions);
  }


  _bindPopupToMarker() {
    this.__mapMarker.bindPopup(this.__popup.mapPopup);
  }
}
