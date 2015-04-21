import {partial} from 'ramda';
import compile from './compile';

export default (gsMapPlacesHelperService, gsPlaceMarkerManager) =>
  ({
    restrict: 'E',
    replace: true,
    require: '^gsMap',
    scope: {
      placesStream: '='
    },
    template: '<span></span>',
    compile: partial(compile, gsMapPlacesHelperService, gsPlaceMarkerManager)
  });
