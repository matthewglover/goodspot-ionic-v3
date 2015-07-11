import controller from './controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    template: '<span style="visibility: hidden"><span>',
    controller,
    controllerAs: 'ctrl'
  });
