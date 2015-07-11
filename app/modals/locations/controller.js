import {isNil, isEmpty, find, propEq, not, eq, partial} from 'ramda';
import addLocationTemplate from '../add-location/template.html';
import viewLocationTemplate from '../view-location/template.html';
import buildModal from '../../lib/build-modal';

import {DELETE_LOCATION} from '../../app-constants';


export default class LocationsController {

  __$scope
  __$ionicListDelegate
  __gsLocationManager
  __gsUserEvents
  _buildModal

  __locations

  __selectedLocationId
  __crntSelectedLocationId


  __selectMode


  constructor($scope, $ionicModal, $ionicListDelegate, gsLocationManager, $timeout, gsUserEvents) {
    this.__$scope = $scope;
    this.__$ionicListDelegate = $ionicListDelegate;
    this.__gsLocationManager = gsLocationManager;
    this.__$timeout = $timeout;
    this.__gsUserEvents = gsUserEvents;
    this._buildModal = partial(buildModal, $ionicModal);

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

    const {modal} = this._buildModal(modalScope, addLocationTemplate);

    modal.show();
  }


  deleteLocation(location) {
    this.__gsUserEvents
      .raiseEvent(DELETE_LOCATION, location);
  }


  editLocation(location) {
    const modalScope =
      angular.extend(this.__$scope.$new(), {location, isEditMode: true});


    // const modal =
    //   this.__$ionicModal.fromTemplate(viewLocationTemplate, {
    //     scope: modalScope,
    //     animation: 'slide-in-up'
    //   });
    //
    // modalScope.__modal = modal;
    const {modal} = this._buildModal(modalScope, viewLocationTemplate);


    modal.show();

    this.__$ionicListDelegate
      .$getByHandle('editable-location-list')
      .closeOptionButtons();
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
