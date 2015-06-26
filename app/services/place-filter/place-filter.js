import {eq, length, isNil} from 'ramda';

import {
  isMyGoodspot,
  isFriendOrMyGoodspot,
  isGoodspot,
  PLACE_FILTERS
} from './helpers'


export default class PlaceFilter {

  __filterIndex
  __gsPlaceExplorerDataService


  constructor(gsPlaceExplorerDataService) {
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;
    this.filterIndex = length(PLACE_FILTERS) - 1;
  }


  get filterIndex() {
    return this.__filterIndex;
  }


  set filterIndex(filterIndex) {
    if (eq(this.__filterIndex, filterIndex)) return;

    const oldIndex = this.__filterIndex;

    this.__filterIndex = filterIndex;

    this._updatePlaceExplorerFilters(this._getPlaceFilter(oldIndex), this._getPlaceFilter(filterIndex));
  }


  get description() {
    return this.__filterData.description;
  }


  get __filter() {
    return this.__filterData.filter;
  }


  get __filterData() {
    return this._getPlaceFilterData(this.filterIndex);
  }


  getDescriptionForIndex(filterIndex) {
    if (filterIndex >= 0 && filterIndex < PLACE_FILTERS.length)
      return PLACE_FILTERS[filterIndex].description;
    else {
      throw new Error('Index out of bounds');
    }
  }


  _getPlaceFilterData(filterIndex) {
    return PLACE_FILTERS[filterIndex];
  }


  _getPlaceFilter(filterIndex) {
    return isNil(filterIndex) ?
      undefined : this._getPlaceFilterData(filterIndex).filter;
  }


  _updatePlaceExplorerFilters(oldFilter, newFilter) {
    this.__gsPlaceExplorerDataService.removeFilter(oldFilter);
    this.__gsPlaceExplorerDataService.addFilter(newFilter);
  }
}
