import Rx from 'rxjs/dist/rx.lite';

import {pipe, pluck, map, substringFrom, contains, flip, reject, concat, partial, merge, evolve} from 'ramda';

import distanceBetween from '../../lib/distance-between';


const addMetersFrom = (position, place) =>
  merge(place, {metersFrom: distanceBetween(position, place.pos)});


const flippedContains = flip(contains);


const getGoodspotFactualIds = pipe(
  pluck('id'),
  map(substringFrom('goodspot:'.length))
);


const filterFactualPlaces = (goodspotPlaces, factualPlaces) => {
  const matchIds = getGoodspotFactualIds(goodspotPlaces);
  const isMatch = place => flippedContains(matchIds)(place.id);
  return reject(isMatch)(factualPlaces)
}


const mergePlaces = (location, goodspotPlaces, factualPlaces) => {
  const filteredFactualPlaces = filterFactualPlaces(goodspotPlaces, factualPlaces);
  return {
    location,
    places: concat(goodspotPlaces, filteredFactualPlaces)
  };
};


export default class PlaceSearch {

  __gsFactualSearch
  __gsGoodspotApi


  constructor({gsFactualSearch, gsGoodspotApi}) {
    this.__gsFactualSearch = gsFactualSearch;
    this.__gsGoodspotApi = gsGoodspotApi;
  }


  searchLocation(personId, location) {
    const goodspotStream = this._searchGoodspotLocation(personId, location);
    const factualStream = this._searchFactualLocation(location);

    return goodspotStream
      .combineLatest(factualStream, partial(mergePlaces, location))
      .map(evolve({places: map(partial(addMetersFrom, location.pos))}));
  }


  _searchFactualLocation(location) {
    return this.__gsFactualSearch.searchLocation(location);
  }


  _searchGoodspotLocation(personId, location) {
    return this.__gsGoodspotApi.searchLocation(personId, location);
  }
}
