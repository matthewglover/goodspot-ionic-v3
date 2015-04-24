import {partial} from 'ramda';
import MapPlaces from './map-places'


const pre = (gsPlaceMarkerManager, scope, element, attributes, mapController) => {
  new MapPlaces({scope, mapController, gsPlaceMarkerManager});
};


const compile = (gsPlaceMarkerManager) =>
  ({
    pre: partial(pre, gsPlaceMarkerManager),
    post: () => {}
  });

export default compile;
