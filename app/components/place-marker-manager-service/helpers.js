import {
  isNil,
  map,
  prop,
  reject,
  any,
  append,
  reduce,
  find,
  propEq,
  flip,
  eqDeep,
  not
} from 'ramda';


import {
  getIds,
  flipEquivMatchId,
  equivOnlyMatchId,
  equivMatchId,
  DataSet
} from '../../helpers/place-id-matchers';



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



// Finds places that were factual places which now have a corresponding goodspot id
export const findFactualToGoodspotChangePlaces = (oldPlaces, newPlaces) => {

  // Get list of old and new ids
  const oldIds = getIds(oldPlaces);
  const newIds = getIds(newPlaces);

  // Predicate - Check if there is a matching old id for a newId
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


export const findGoodspotDetailChangePlaces = (oldPlaces, newPlaces) => {
  const oldData = new DataSet(oldPlaces);

  const placeHasChanged = (acc, newPlace) => {
    if (oldData.hasChanged(newPlace))
      return append([oldData.getPlace(newPlace.id), newPlace], acc);
    else
      return acc;
  }

  return reduce(placeHasChanged, [], newPlaces);
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
