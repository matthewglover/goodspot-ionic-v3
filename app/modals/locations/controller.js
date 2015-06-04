import {isNil, isEmpty, find, propEq, not, eq} from 'ramda';
import addLocationTemplate from '../add-location/template.html';
import viewLocationTemplate from '../view-location/template.html';


import {DELETE_LOCATION} from '../../app-constants';


export default class LocationsController {

  __$scope
  __$ionicModal
  __gsLocationManager
  __gsUserEvents

  __locations

  __selectedLocationId
  __crntSelectedLocationId


  __selectMode


  constructor($scope, $ionicModal, gsLocationManager, $timeout, gsUserEvents) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
    this.__gsLocationManager = gsLocationManager;
    this.__$timeout = $timeout;
    this.__gsUserEvents = gsUserEvents;

    this.__selectMode = true;

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


  get selectMode() {
    return this.__selectMode;
  }


  get editMode() {
    return not(this.selectMode);
  }


  isSelectedLocation(location) {
    return eq(location.id, this.selectedLocationId);
  }


  isNotSelectedLocation(location) {
    return not(this.isSelectedLocation(location));
  }


  setEditMode() {
    this.__selectMode = false;
  }


  setSelectMode() {
    this.__selectMode = true;
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


  deleteLocation(location) {
    this.__gsUserEvents
      .raiseEvent(DELETE_LOCATION, location);
  }


  editLocation(location) {
    const modalScope =
      angular.extend(this.__$scope.$new(), {location, isEditMode: true});


    const modal =
      this.__$ionicModal.fromTemplate(viewLocationTemplate, {
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
