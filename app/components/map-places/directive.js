import {partial} from 'ramda';
import compile from './compile';

export default (gsPlaceMarkerManager) =>
  ({
    restrict: 'E',
    replace: true,
    require: '^gsMap',
    scope: {
      placesStream: '='
    },
    template: '<span></span>',
    compile: partial(compile, gsPlaceMarkerManager)
  });
