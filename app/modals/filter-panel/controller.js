import {isNil} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


export default class FilterPanelController {

  __$scope
  __gsPlaceFilter

  __placeSubject

  __placeRangeSubject

  constructor($scope, gsPlaceFilter) {
    this.__$scope = $scope;
    this.__gsPlaceFilter = gsPlaceFilter;

    this.__placeRange = gsPlaceFilter.range;

    this.__placeRangeSubject = new Rx.Subject();
    this._initUpdatePlaceRangeUpdate();
  }


  get placeFilterDescription() {
    return this.__gsPlaceFilter.getDescriptionForIndex(this.__placeRange);
  }


  get placeRange() {
    return this.__placeRange;
  }


  set placeRange(placeRange) {
    this.__placeRange = placeRange;
    this.__placeRangeSubject.onNext(placeRange);
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  _initUpdatePlaceRangeUpdate() {
    this.__placeRangeSubject
      .debounce(500)
      .subscribe(placeRange => this.__gsPlaceFilter.range = placeRange);
  }
}
