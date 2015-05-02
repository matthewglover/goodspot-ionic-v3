import template from './template.html';
import PlaceExplorerController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      placesStream: '=',
      positionStream: '='
    },
    template,
    controller: PlaceExplorerController,
    controllerAs: 'ctrl'
  });
