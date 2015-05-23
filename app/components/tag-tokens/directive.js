import template from './template.html';
import TagTokensController from './controller';


export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      place: '=',
      tagHandler: '&',
      untagHandler: '&'
    },
    template,
    controller: TagTokensController,
    controllerAs: 'ctrl'
  });
