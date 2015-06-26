import template from './template.html';
import PlaceFilterWidgetController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
    },
    template,
    controller: PlaceFilterWidgetController,
    controllerAs: 'ctrl'
  });
