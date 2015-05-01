import template from './template.html';
import PlaceExplorerController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: false,
    scope: {},
    bindToController: {},
    template,
    controller: PlaceExplorerController,
    controllerAs: 'ctrl'
  });
