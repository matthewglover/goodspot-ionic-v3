import {isNil, not, prop, find, complement, isEmpty, propEq, reject} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


import {SPOT_PLACE, UNSPOT_PLACE, TAG_PLACE, UNTAG_PLACE} from '../../app-constants';
import {equivMatchId} from '../../helpers/place-id-matchers';
import popoverTemplate from './popover-template.html';


const isNotEmpty = complement(isEmpty);


const isNotNil = complement(isNil);


const BLANK_OBJECT = {};


export default class PlaceDetailController {


  __$scope
  __$timeout
  __gsUserEvents
  __gsPlaceExplorerDataService
  __place

  __popover


  constructor($scope, $timeout, gsUserEvents, gsPlaceExplorerDataService, $ionicPopover) {
    this.__$scope = $scope;
    this.__$timeout = $timeout
    this.__gsUserEvents = gsUserEvents;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.__placeStream = new Rx.ReplaySubject(1);

    this._initPopover($ionicPopover);

    this._watchPlaceId();
  }


  get placeStream() {
    return this.__placeStream;
  }


  get place() {
    if (isNil(this.__place)) return BLANK_OBJECT;
    else return this.__place;
  }


  set place(place) {
    this.__place = place;
    this.__placeStream.onNext(place);
  }


  get __searchResultsStream() {
    return this.__gsPlaceExplorerDataService.searchResultsStream;
  }


  get placeName() {
    return this.place.name;
  }


  get goodspots() {
    return this.place.totalSpots || 0;
  }


  get friendspots() {
    return this.place.friendSpots || 0;
  }


  get isMyGoodspot() {
    return this.place.isMyGoodspot;
  }


  get pos() {
    return this.place.pos;
  }


  get isNotMyGoodspot() {
    return not(this.isMyGoodspot);
  }


  get tags() {
    return this.place.tags;
  }


  get hasTags() {
    return isNotNil(this.place.tags) &&
      isNotEmpty(reject(propEq('totalTags', 0))(this.place.tags));
  }


  spotPlace() {
    this._raiseEvent(SPOT_PLACE, this.place);
  }


  unspotPlace() {
    this._raiseEvent(UNSPOT_PLACE, this.place);
  }


  showTagList($event) {
    this.__popover.show($event);
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  addTag(tag) {
    this.tagPlace(tag);
    this.__popover.hide();
  }


  tagPlace(tag) {
    this._raiseEvent(TAG_PLACE, {place: this.place, tag});
  }


  untagPlace(tag) {
    this._raiseEvent(UNTAG_PLACE, {place: this.place, tag});
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }


  _watchPlaceId() {
    const unwatch =
      this.__$scope.$watch('placeId', placeId => {
        unwatch();
        this._initPlace(placeId);
      });
  }


  _initPlace(placeId) {
    this.__searchResultsStream
      .map(prop('places'))
      .map(find(({id}) => equivMatchId(id, placeId)))
      .subscribe(place => this._updatePlace(place));
  }


  _updatePlace(place) {
    this.place = place;
    this.__$timeout(_ => {});
  }


  _initPopover($ionicPopover) {
    this.__popover =
      $ionicPopover.fromTemplate(popoverTemplate, {scope: this.__$scope});
  }
}
