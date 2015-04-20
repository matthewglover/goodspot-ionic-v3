import {pipe, isArrayLike, split, map, contains, filter, isNil, join, complement} from 'ramda';


const compact = filter(complement(isNil));


const niceDescription = (displayName, {continent, supermarket}) =>
  pipe(
    split(','),
    map(field => field.trim()),
    map(field => contains(field, [continent, supermarket]) ? undefined : field),
    compact,
    join(', ')
  )(displayName);


const cleanLocation = (location) =>
  ({
    description: niceDescription(location.display_name, location.address),
    pos: [+location.lat, +location.lon],
    countryCode: location.address.country_code
  });


const cleanData = pipe(
  (response) => response.data,
  (locations) => isArrayLike(locations) ? locations : [locations],
  map(cleanLocation)
);


export default cleanData;
