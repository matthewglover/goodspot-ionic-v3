import {isNil, pipe, pick, merge} from 'ramda';
import {SAVE_LOCATION} from '../../app-constants'

const buildSaveLocation = (locationName, locationPos, location) =>
  pipe(
    pick(['countryCode']),
    location => merge({name: locationName, pos: locationPos}, location)
  )(location);


export default class ViewLocationController {


  __$scope
  __gsUserEvents

  __location
  __locationName
  __locationSavePos

  constructor($scope, gsUserEvents) {
    this.__$scope = $scope;
    this.__gsUserEvents = gsUserEvents;

    this.__location = $scope.location;
    this.__locationName = $scope.locationName;
    this.__locationSavePos = $scope.location.pos;

    this._reactToHomeMarkerUpdates();
  }


  get locationName() {
    return this.__locationName;
  }


  set locationName(locationName) {
    this.__locationName = locationName;
  }


  get locationPos() {
    return this.__location.pos;
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  saveLocation() {
    const location =
      buildSaveLocation(this.__locationName, this.__locationSavePos, this.__location);

    this.__gsUserEvents.raiseEvent(SAVE_LOCATION, {location});
  }


  _reactToHomeMarkerUpdates() {
    this.__$scope.$on('map:home-marker:dragend', (event, pos) => {
      event.stopPropagation();
      this.__locationSavePos = pos;
    });
  }
}
