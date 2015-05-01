import {values, max, min, pipe, map} from 'ramda';

const getPositions = pipe(
  values,
  map(({pos}) => pos)
)


const getNorth = pipe(
  map(([lat]) => lat),
  max
);


const getSouth = pipe(
  map(([lat]) => lat),
  min
);


const getEast = pipe(
  map(([_, lon]) => lon),
  max
);


const getWest = pipe(
  map(([_, lon]) => lon),
  min
);


const getNorthEast = (markerPositions) =>
  [getNorth(markerPositions), getEast(markerPositions)];


const getSouthWest = (markerPositions) =>
  [getSouth(markerPositions), getWest(markerPositions)];


export default (markers) => {
  const markerPositions = getPositions(markers);
  return [getSouthWest(markerPositions), getNorthEast(markerPositions)];
};
