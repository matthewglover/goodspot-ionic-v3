import {merge, nth} from 'ramda';

export const reverseOptions = ([lat, lon]) =>
  ({
    params: merge({format: 'json'}, {lat, lon})
  });


export const pluckFirst = nth(0);
