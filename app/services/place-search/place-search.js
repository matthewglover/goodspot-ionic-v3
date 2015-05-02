import Rx from 'rxjs/dist/rx.lite';

import {pipe, pluck, map, substringFrom, contains, flip, reject, concat} from 'ramda';


const flippedContains = flip(contains);


const getGoodspotFactualIds = pipe(
  pluck('id'),
  map(substringFrom('goodspot:'.length))
);


const filterFactualPlaces = (goodspotPlaces, factualPlaces) => {
  const matchIds = getGoodspotFactualIds(goodspotPlaces);
  const isMatch = place => flippedContains(matchIds)(place.id);
  return reject(isMatch)(factualPlaces)
};


const mergePlaces = (goodspotPlaces, factualPlaces) => {
  const filteredFactualPlaces = filterFactualPlaces(goodspotPlaces, factualPlaces);
  return concat(goodspotPlaces, filteredFactualPlaces)
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

    return Rx.Observable.combineLatest(goodspotStream, factualStream, mergePlaces);
  }


  _searchFactualLocation(location) {
    return this.__gsFactualSearch.searchLocation(location);
  }


  _searchGoodspotLocation(personId, location) {
    return this.__gsGoodspotApi.searchLocation(personId, location);
  }
}
