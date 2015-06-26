import {sort, isNil} from 'ramda';


const getMetersFrom = (place) =>
  isNil(place.metersFrom) ?
    0 :
    place.metersFrom;


const getTotalSpots = (place) =>
  isNil(place.totalSpots) ?
    0 :
    place.totalSpots;


// Sort by total spots (highest first)
const diffByTotalSpots = (a, b) => {
  if (getTotalSpots(a) > getTotalSpots(b)) return -1;
  if (getTotalSpots(a) < getTotalSpots(b)) return 1;
  return 0;
};


// Sort by metersFrom (lowest first)
const diffByMetersFrom = (a, b) => {
  if (getMetersFrom(a) < getMetersFrom(b)) return -1;
  if (getMetersFrom(a) > getMetersFrom(b)) return 1;
  return 0;
};


// Check if value not zero
const notZero = v => v !== 0;


// Sort by totalSpots and then by metersFrom
const diffByTotalSpotsThenMetersFrom = (a, b) => {
  const totalSpotDiff = diffByTotalSpots(a, b);
  const metersFromDiff = diffByMetersFrom(a, b);

  if (notZero(totalSpotDiff))
    return totalSpotDiff;
  else if (notZero(metersFromDiff))
    return metersFromDiff;
  else
    return 0;
};


export const sortByTotalSpotsThenMetersFrom =
  sort(diffByTotalSpotsThenMetersFrom);


export const sortByMetersFrom =
  sort(diffByMetersFrom);
