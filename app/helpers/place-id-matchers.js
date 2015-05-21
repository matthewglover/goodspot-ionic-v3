import {
  pipe,
  isNil,
  map,
  prop,
  substringTo,
  substringFrom,
  strIndexOf,
  curry,
  flip,
  fromPairs,
  eqDeep,
  not
} from 'ramda';


export const getIds = map(prop('id'));


const toDataSetData = pipe(
  map(place => [place.id, place]),
  fromPairs
);



export class DataSet {

  __data

  constructor(dataArray) {
    this.__data = toDataSetData(dataArray);
  }


  hasChanged(place) {
    const dataPlace = this.getPlace(place.id);

    if (isNil(dataPlace)) return false;
    else return not(eqDeep(dataPlace, place));
  }


  getPlace(placeId) {
    return this.__data[placeId];
  }
}

// Check if ids are the same or equivalent
// (i.e. factual version of a goodspot id)
export const equivMatchId = curry((newId, oldId) => {
  const matchString =
    substringTo('goodspot:'.length)(newId) === 'goodspot:' ?
      substringFrom('goodspot:'.length)(newId) :
      newId;

  return strIndexOf(matchString)(oldId) > -1;
});


export const flipEquivMatchId = flip(equivMatchId);


export const equivOnlyMatchId = curry((newId, oldId) => {
  return equivMatchId(newId, oldId) && newId !== oldId;
});
