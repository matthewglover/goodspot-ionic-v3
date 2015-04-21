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


export default class PlaceMarker {

  __popup
  __place


  constructor(place, gsPlacePopupFactory) {
    this.__place = place;
    this.__popup = gsPlacePopupFactory(place);
    this.__mapMarker = this._buildMapMarker();

    this._bindPopupToMarker();
  }


  get mapMarker() {
    return this.__mapMarker;
  }


  get id() {
    switch (this.__place.placeType) {
      case 'factual':
        return this.__place.id;
      case 'goodspot':
        return this.__place._uid;
      default:
        throw new TypeError('Unhandled placeType');
    }
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
