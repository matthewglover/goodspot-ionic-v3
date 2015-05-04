import {curry, pipe} from 'ramda';


// Radius of the earth in km
const R = 6371;


const degreesToRadians = (deg) => deg * (Math.PI/180);


// Haversine formula: distance in km between two points
const haversine = ([latA, lonA], [latB, lonB]) => {
  const dLat = degreesToRadians(latB - latA);
  const dLon = degreesToRadians(lonB - lonA);

  const a =
    Math.sin(dLat/2) *
    Math.sin(dLat/2) +
    Math.cos(degreesToRadians(latA)) *
    Math.cos(degreesToRadians(latB)) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;

  return d;
};


// km -> m
const roundTo10Meters = (distanceKm) =>
  Math.round(distanceKm * 100) * 10;


export default curry(pipe(haversine, roundTo10Meters));
