import template from './template.html';
import PlaceExplorerListController from './controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      placesStream: '='
    },
    template,
    controller: PlaceExplorerListController,
    controllerAs: 'ctrl'
  });
