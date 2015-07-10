import template from './template.html';
import controller from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      parentCtrl: '='
    },
    template,
    controller,
    controllerAs: 'ctrl'
  });
