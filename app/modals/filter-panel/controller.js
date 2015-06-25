import {isNil} from 'ramda';


export default class FilterPanelController {

  __$scope
  __gsPlaceFilter


  constructor($scope, gsPlaceFilter) {
    this.__$scope = $scope;
    this.__gsPlaceFilter = gsPlaceFilter;

    this.placeRange = this.__gsPlaceFilter.range;
  }


  get placeFilterDescription() {
    return this.__gsPlaceFilter.description;
  }


  get placeRange() {
    return this.__gsPlaceFilter.range;
  }


  set placeRange(placeRange) {
    this.__gsPlaceFilter.range = placeRange;
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }
}
