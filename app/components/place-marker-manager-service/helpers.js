import {
  values,
  pipe,
  isNil,
  map,
  prop,
  reject,
  any,
  substringTo,
  substringFrom,
  strIndexOf,
  curry,
  append,
  reduce,
  find,
  propEq,
  filter,
  flip
} from 'ramda';



const getIds = map(prop('id'));


// Check if ids are the same or equivalent
// (i.e. factual version of a goodspot id)
const equivMatchId = curry((newId, oldId) => {
  const matchString =
    substringTo('goodspot:'.length)(newId) === 'goodspot:' ?
      substringFrom('goodspot:'.length)(newId) :
      newId;

  const res =
    strIndexOf(matchString)(oldId) > -1;

  return res;
});


const flipEquivMatchId = flip(equivMatchId);

const equivOnlyMatchId = curry((newId, oldId) => {
  return equivMatchId(newId, oldId) && newId !== oldId;
});



export const findDeleteIds = (oldPlaces, newPlaces) => {
  // Get list of old and new ids
  const oldIds = getIds(oldPlaces);
  const newIds = getIds(newPlaces);

  // Predicate - takes an oldId and checks if there is a matching new id
  const matchesNewId = (oldId) => any(flipEquivMatchId(oldId))(newIds);

  // Return only those ids that DON'T match an old id
  const rejectIds = reject(matchesNewId)(oldIds);

  return rejectIds;
};


export const findChangePlaces = (oldPlaces, newPlaces) => {
  // Get list of old and new ids
  const oldIds = getIds(oldPlaces);
  const newIds = getIds(newPlaces);

  // Predicate - takes a newId and checks if there is a matching old id
  const matchesOldId = (acc, newId) => {
    const matchId = find(equivOnlyMatchId(newId))(oldIds);

    if (isNil(matchId)) return acc;
    else return append([matchId, newId], acc);
  };


  const getOldPlace = (oldId) =>
    find(propEq('id', oldId))(oldPlaces);


  const getNewPlace = (newId) =>
    find(propEq('id', newId))(newPlaces);


  const idsToPlaces = ([oldId, newId]) =>
    [getOldPlace(oldId), getNewPlace(newId)];

  // Return only those ids that DON'T match an old id
  const changeIds = reduce(matchesOldId, [])(newIds);

  const changePlaces = map(idsToPlaces)(changeIds);

  return changePlaces;
};


export const findCreatePlaces = (oldPlaces, newPlaces) => {
  // Get list of old and new ids
  const oldIds = getIds(oldPlaces);
  const newIds = getIds(newPlaces);

  // Predicate - takes a newId and checks if there is a matching old id
  const matchesOldId = (newId) => any(equivMatchId(newId))(oldIds);


  const getNewPlace = (newId) =>
    find(propEq('id', newId))(newPlaces);


  // Return only those ids that DO match an old id
  const createIds = reject(matchesOldId)(newIds);

  const createPlaces = map(getNewPlace)(createIds);

  return createPlaces;
};
