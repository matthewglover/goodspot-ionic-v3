import {isNil, pipe, pick, merge, complement} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';
import {CREATE_USER_DEFINED_LOCATION, EDIT_LOCATION} from '../../app-constants'


const isNotNil = complement(isNil);


const buildSaveLocation = (locationName, locationPos, location, isEditMode) => {
  const pickOptions = isEditMode ? ['countryCode', 'id'] : ['countryCode'];

  return pipe(
    pick(pickOptions),
    loc => merge({name: locationName, pos: locationPos}, loc)
  )(location);
};


export default class ViewLocationController {


  __$scope
  __$timeout
  __gsUserEvents

  __location
  __locationName
  __locationSavePos

  __isEditMode

  constructor($scope, gsUserEvents, $timeout) {
    this.__$scope = $scope;
    this.__$timeout = $timeout;
    this.__gsUserEvents = gsUserEvents;

    this.__location = $scope.location;
    this.__locationName = $scope.locationName || $scope.location.name;
    this.__locationSavePos = $scope.location.pos;

    this.__isEditMode = $scope.isEditMode;

    this.__positionStream =
      Rx.Observable.just(this.__location.pos);

    this._reactToHomeMarkerUpdates();
  }


  get locationName() {
    return this.__locationName;
  }


  set locationName(locationName) {
    this.__locationName = locationName;
  }


  get positionStream() {
    return this.__positionStream;
  }


  get locationPos() {
    return this.__location.pos;
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  closeParent() {
    if (isNotNil(this.__$scope.parent)) this.__$scope.parent.close();
  }


  // NOTE: This function stops close buttons in modals working (not sure why)
  // Current solution is fine - i.e. close in current evt loop
  // But doesn't solve underlying bug
  saveLocation() {
    this.close();
    this.closeParent();

    const location =
      buildSaveLocation(this.__locationName, this.__locationSavePos, this.__location, this.__isEditMode);

    if (this.__isEditMode)
      this.__$timeout(_ => this._raiseEditLocationEvt(location), 100);
    else
      this.__$timeout(_ => this._raiseSaveLocationEvt(location), 100);
  }


  _raiseEditLocationEvt(location) {
    this.__gsUserEvents.raiseEvent(EDIT_LOCATION, location);
  }


  _raiseSaveLocationEvt(location) {
    this.__gsUserEvents.raiseEvent(CREATE_USER_DEFINED_LOCATION, {location});
  }


  _reactToHomeMarkerUpdates() {
    this.__$scope.$on('map:home-marker:dragend', (event, pos) => {
      event.stopPropagation();
      this.__locationSavePos = pos;
    });
  }
}
