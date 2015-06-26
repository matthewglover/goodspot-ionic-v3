import {sortByTotalSpotsThenMetersFrom, sortByMetersFrom} from './helpers';

const SORT_OBJS = [
  {description: 'Total Spots', sortFn: sortByTotalSpotsThenMetersFrom},
  {description: 'Distance', sortFn: sortByMetersFrom}
];


export default class PlaceSort {


  __gsPlaceExplorerDataService


  constructor({gsPlaceExplorerDataService}) {
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.sortIndex = 0;
  }


  get SORT_OBJS() {
    return SORT_OBJS;
  }


  get sortIndex() {
    return this.__sortIndex;
  }


  set sortIndex(sortIndex) {
    this.__sortIndex = sortIndex;
    this._updatePlaceExplorerSort(this.SORT_OBJS[sortIndex].sortFn);
  }


  _updatePlaceExplorerSort(sortFunction) {
    this.__gsPlaceExplorerDataService.sortFunction = sortFunction;
  }
}
