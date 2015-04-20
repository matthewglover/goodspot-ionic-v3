import buildPlaceMarkers from './build-place-markers';
import addMarkersToLayer from './add-markers-to-layer';

export default class MapPlacesHelperService {

  __$compile
  __$rootScope

  constructor({$rootScope, $compile}) {
    this.__$compile = $compile;
    this.__$rootScope = $rootScope;
  }


  buildPlaceMarkerLayer(places) {
    const placeMarkerLayer = new L.MarkerClusterGroup();

    addMarkersToLayer(placeMarkerLayer, buildPlaceMarkers(this.__$rootScope, this.__$compile, places));

    return placeMarkerLayer;
  }
}
