import {partial} from 'ramda';
import MapPlaces from './map-places'


const pre = (gsMapPlacesHelperService, scope, element, attributes, mapController) => {
  new MapPlaces({scope, mapController, gsMapPlacesHelperService});
};


const compile = (gsMapPlacesHelperService) =>
  ({
    pre: partial(pre, gsMapPlacesHelperService),
    post: () => {}
  });

export default compile;
