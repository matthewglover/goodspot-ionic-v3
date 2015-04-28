import {merge, nth} from 'ramda';

export const reverseOptions = ([lat, lon]) =>
  ({
    params: merge({format: 'json'}, {lat, lon})
  });


export const pluckFirst = nth(0);


export const geocodeOptions = (searchText) =>
  ({
    params: {
      format: 'json',
      addressdetails: 1,
      q: searchText
    }
  });
