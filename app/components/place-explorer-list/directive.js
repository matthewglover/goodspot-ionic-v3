import template from './template.html';
import PlaceExplorerListController from './controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      searchResultsStream: '=',
      selectPlaceHandler: '&'
    },
    template,
    controller: PlaceExplorerListController,
    controllerAs: 'ctrl'
  });
