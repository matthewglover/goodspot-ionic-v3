import {isNil} from 'ramda';
import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';

export default class ExploreLocationController {

  __activeLocationStream;
  __placesStream;
  __mapPosition

  __$scope
  __$ionicModal

  __popover

  constructor(gsLocationManager, gsPlaceSearchManager, $ionicPopover, $scope, $ionicModal) {
    this.__activeLocationStream = gsLocationManager.selectedLocationStream;
    this.__placesStream = gsPlaceSearchManager.placesStream;

    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;

    this._reactToActiveLocationStream();

    this._initPopover($ionicPopover);
  }


  get mapPosition() {
    return this.__mapPosition;
  }


  get placesStream() {
    return this.__placesStream;
  }


  showOptions($event) {
    this.__popover.show($event);
  }


  changeLocation() {
    const modalScope = this.__$scope.$new();
    const modal =
      this.__$ionicModal.fromTemplate(changeLocationTemplate, {scope: modalScope});

    modalScope.__modal = modal;

    modal.show();
  }


  _reactToActiveLocationStream() {
    this.__activeLocationStream
      .subscribe(location => this.__mapPosition = location.pos);
  }


  _initPopover($ionicPopover) {
    this.__popover =
      $ionicPopover.fromTemplate(popoverTemplate, {scope: this.__$scope});
  }
}
