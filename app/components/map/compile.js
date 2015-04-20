import {isNil, complement} from 'ramda';
import Map from './map'


const isNotNil = complement(isNil);


const preLink = (scope, element) => {
  const map = new Map(scope, element[0]);

  scope.$watch('position', pos => {
    if (isNotNil(pos))   map.position = pos
  });
};


const compile = () =>
  ({
    pre: preLink,
    post: () => {}
  })


export default compile;
