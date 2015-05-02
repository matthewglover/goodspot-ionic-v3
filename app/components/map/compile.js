import {isNil, complement, partial} from 'ramda';
import Map from './map'


const isNotNil = complement(isNil);


const preLink = ($timeout, scope, element) =>
  new Map(scope, element[0], $timeout);


const compile = ($timeout) =>
  ({
    pre: partial(preLink, $timeout),
    post: () => {}
  })


export default compile;
