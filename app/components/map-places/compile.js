import {partial} from 'ramda';
import MapPlaces from './map-places'


const pre = (gsMapPlacesHelperService, gsPlaceMarkerManager, scope, element, attributes, mapController) => {
  new MapPlaces({scope, mapController, gsMapPlacesHelperService, gsPlaceMarkerManager});
};


const compile = (gsMapPlacesHelperService, gsPlaceMarkerManager) =>
  ({
    pre: partial(pre, gsMapPlacesHelperService, gsPlaceMarkerManager),
    post: () => {}
  });

export default compile;
