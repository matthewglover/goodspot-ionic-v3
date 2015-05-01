import {isNil, complement} from 'ramda';
import Map from './map'


const isNotNil = complement(isNil);


const preLink = (scope, element) => new Map(scope, element[0]);


const compile = () =>
  ({
    pre: preLink,
    post: () => {}
  })


export default compile;
