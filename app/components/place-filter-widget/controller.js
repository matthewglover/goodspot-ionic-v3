import Rx from 'rxjs/dist/rx.lite';


export default class PlaceFilterWidgetController {


  __gsPlaceFilter


  __filterIndex
  __filterIndexSubject


  constructor(gsPlaceFilter) {
    this.__gsPlaceFilter = gsPlaceFilter;

    this.__filterIndex = gsPlaceFilter.filterIndex;

    this.__filterIndexSubject = new Rx.Subject();
    this._initUpdateFilterIndex();
  }


  get filterDescription() {
    return this.__gsPlaceFilter.getDescriptionForIndex(this.__filterIndex);
  }


  get filterIndex() {
    return this.__filterIndex;
  }


  set filterIndex(filterIndex) {
    this.__filterIndex = filterIndex;
    this.__filterIndexSubject.onNext(filterIndex);
  }


  _initUpdateFilterIndex() {
    this.__filterIndexSubject
      .debounce(500)
      .subscribe(filterIndex => this.__gsPlaceFilter.filterIndex = filterIndex);
  }
}
