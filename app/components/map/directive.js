import template from './template.html';
import compile from './compile';
import MapController from './controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      positionStream: '=',
      positionDraggable: '='
    },
    compile,
    controller: MapController,
    template
  });
