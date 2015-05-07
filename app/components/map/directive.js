import template from './template.html';
import controller from './controller';


const link = (scope, element) =>
  scope.$broadcast('map:loaded', element[0]);


export default ($timeout) =>
  ({
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    bindToController: {
      positionStream: '=',
      positionDraggable: '='
    },
    link,
    controller,
    controllerAs: 'ctrl',
    template
  });
