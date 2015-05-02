import template from './template.html';
import compile from './compile';
import MapController from './controller';
import {partial} from 'ramda';

export default ($timeout) =>
  ({
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      positionStream: '=',
      positionDraggable: '='
    },
    compile: partial(compile, $timeout),
    controller: MapController,
    template
  });
