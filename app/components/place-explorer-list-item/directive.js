import template from './template.html';
import PlaceExplorerListItemController from './controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      place: '=',
      onClick: '&'
    },
    template,
    controller: PlaceExplorerListItemController,
    controllerAs: 'ctrl'
  });
