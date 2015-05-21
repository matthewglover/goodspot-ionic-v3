import {isNil, not, prop, find} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


import {SPOT_PLACE} from '../../app-constants';
import {equivMatchId} from '../../helpers/place-id-matchers';


export default class PlaceDetailController {


  __$scope
  __$timeout
  __gsUserEvents
  __gsPlaceExplorerDataService
  __place


  constructor($scope, $timeout, gsUserEvents, gsPlaceExplorerDataService) {
    this.__$scope = $scope;
    this.__$timeout = $timeout
    this.__gsUserEvents = gsUserEvents;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.__placeStream = new Rx.ReplaySubject(1);

    this._watchPlaceId();
  }


  get placeStream() {
    return this.__placeStream;
  }


  get place() {
    if (isNil(this.__place)) return {};
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


  spotPlace() {
    this._raiseEvent(SPOT_PLACE, this.place);
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
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
    this.__$timeout(_ => this.place = place);
  }
}
