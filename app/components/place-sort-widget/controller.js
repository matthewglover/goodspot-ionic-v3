import Rx from 'rxjs/dist/rx.lite';


export default class PlaceSortWidgetController {


  __gsPlaceSort

  __sortIndexSubject
  __sortIndex


  constructor(gsPlaceSort) {
    this.__gsPlaceSort = gsPlaceSort;

    this.__sortIndex = gsPlaceSort.sortIndex;

    this.__sortIndexSubject = new Rx.Subject();

    this._initUpdateSortIndex();
  }


  get sortIndex() {
    return this.__sortIndex;
  }


  set sortIndex(sortIndex) {
    this.__sortIndex = sortIndex;
    this.__sortIndexSubject.onNext(sortIndex);
  }


  get sortObjs() {
    return this.__gsPlaceSort.SORT_OBJS;
  }


  _initUpdateSortIndex() {
    this.__sortIndexSubject
      .debounce(500)
      .subscribe(sortIndex => this.__gsPlaceSort.sortIndex = sortIndex);
  }
}
