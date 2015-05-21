import {partial} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';

import template from './template.html';
import controller from './controller';


const link = ($timeout, scope, elem) => {
  scope.elementWidthStream = new Rx.ReplaySubject(1);
  $timeout(_ => scope.elementWidthStream.onNext(elem[0].clientWidth));
};



export default ($timeout) =>
  ({
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      placeStream: '='
    },
    link: partial(link, $timeout),
    template,
    controller,
    controllerAs: 'ctrl'
  });
