import {merge, nth} from 'ramda';


export const reverseOptions = ([lat, lon]) =>
  ({
    params: {lat, lon}
  });


export const pluckFirst = nth(0);


export const geocodeOptions = (searchString) =>
  ({
    params: {searchString}
  });


export const getData = ({data}) => data;
