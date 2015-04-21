import buildPlaceMarkers from './build-place-markers';
import addMarkersToLayer from './add-markers-to-layer';
import PlaceMarkersManager from './place-markers-manager';

export default class MapPlacesHelperService {

  __$compile
  __$rootScope

  constructor({$rootScope, $compile}) {
    this.__$compile = $compile;
    this.__$rootScope = $rootScope;

    this.__placeMarkersManager = new PlaceMarkersManager({$rootScope, $compile});
  }


  buildPlaceMarkerLayer(places) {
    // const placeMarkerLayer = new L.MarkerClusterGroup();

    // const placeMarkers = buildPlaceMarkers(this.__$rootScope, this.__$compile, places);

    const __placeMarkers = this._buildPlaceMarkers(places);
    return this.__placeMarkersManager.markerLayer;

    // addMarkersToLayer(placeMarkerLayer, placeMarkers);

    // return placeMarkerLayer;
  }


  _buildPlaceMarkers(places) {
    this.__placeMarkersManager.updateMarkers(places);
  }
}
