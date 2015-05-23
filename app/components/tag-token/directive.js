import template from './template.html';
import TagTokenController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      tag: '=',
      untagHandler: '&',
      tagHandler: '&'
    },
    template,
    controller: TagTokenController,
    controllerAs: 'ctrl'
  });
