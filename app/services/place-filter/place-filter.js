import {filter, propEq, eq, always, length, isNil, complement} from 'ramda';


const isNotNil = complement(isNil);


const isMyGoodspot = propEq('isMyGoodspot', true);


const isFriendSpot = ({friendSpots}) =>
  isNotNil(friendSpots) && friendSpots > 0;


const isFriendOrMyGoodspot = (place) =>
  isFriendSpot(place) || isMyGoodspot(place);


const isGoodspot = propEq('placeType', 'goodspot');


const PLACE_FILTERS= [
  {
    description: 'Just show my goodspots',
    filter: filter(isMyGoodspot)
  },
  {
    description: 'Just show friend and my goodspots',
    filter: filter(isFriendOrMyGoodspot)
  },
  {
    description: 'Just show goodspots',
    filter: filter(isGoodspot)
  },
  {
    description: 'Show all places',
    filter: filter(always(true))
  }
];


export default class PlaceFilter {

  __range
  __gsPlaceExplorerDataService


  constructor(gsPlaceExplorerDataService) {
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;
    this.range = length(PLACE_FILTERS) - 1;
  }


  get range() {
    return this.__range;
  }


  set range(range) {
    if (eq(this.__range, range)) return;

    this.__range = range;
    this._updatePlaceExplorerFilters();
  }


  get description() {
    return this.__filterData.description;
  }


  get __filter() {
    return this.__filterData.filter;
  }


  get __filterData() {
    return this._getPlaceFilter(this.range);
  }


  getDescriptionForIndex(index) {
    if (index >= 0 && index < PLACE_FILTERS.length)
      return PLACE_FILTERS[index].description;
    else {
      throw new Error('Index out of bounds');
    }
  }


  _getPlaceFilter(placeRange) {
    return PLACE_FILTERS[placeRange];
  }


  _updatePlaceExplorerFilters() {
    this.__gsPlaceExplorerDataService.clearFilters();
    this.__gsPlaceExplorerDataService.addFilter(this.__filter);
  }
}
