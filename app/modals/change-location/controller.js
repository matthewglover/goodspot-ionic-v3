import {isNil, isEmpty, find, propEq} from 'ramda';
import addLocationTemplate from '../add-location/template.html'


export default class ChangeLocationController {

  __$scope
  __$ionicModal
  __gsLocationManager

  __locations
  
  __selectedLocationId
  __crntSelectedLocationId

  constructor($scope, $ionicModal, gsLocationManager, $timeout) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
    this.__gsLocationManager = gsLocationManager;
    this.__$timeout = $timeout;

    this._initLocations();
    this._initSelectedLocation()
  }


  get locations() {
    return this.__locations;
  }


  get selectedLocationId() {
    return this.__selectedLocationId;
  }


  set selectedLocationId(locationId) {
    this.__gsLocationManager.selectedLocation =
      this._getLocationFromId(locationId);
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  addLocation() {
    const modalScope = this.__$scope.$new();
    const modal =
      this.__$ionicModal.fromTemplate(addLocationTemplate, {
        scope: modalScope,
        animation: 'slide-in-up'
      });

    modalScope.__modal = modal;

    modal.show();
  }


  _initLocations() {
    this.__gsLocationManager.locationsStream
      .subscribe(locations => this.__locations = locations);
  }


  _initSelectedLocation() {
    this.__gsLocationManager.selectedLocationStream
      .subscribe(location => this._updateSelectedLocationId(location.id));
  }


  _updateSelectedLocationId(locationId) {
    this.__selectedLocationId = locationId;

    if (isNil(this.__crntSelectedLocationId))
      this.__crntSelectedLocationId = locationId;
    else
      this.__$timeout(_ => this.close(), 200);
  }


  _getLocationFromId(locationId) {
    if (isEmpty(this.__locations)) return undefined;
    return find(propEq('id', locationId))(this.__locations);
  }
}
