import template from './template.html';
import PlaceSortWidgetController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
    },
    template,
    controller: PlaceSortWidgetController,
    controllerAs: 'ctrl'
  });
