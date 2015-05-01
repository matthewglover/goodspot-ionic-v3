import {isNil} from 'ramda';
import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';

export default class ExploreLocationController {

  __selectedPositionStream
  __placesStream
  __positionStream

  __$scope
  __$ionicModal

  __popover

  constructor(gsLocationManager, gsPlaceSearchManager, $ionicPopover, $scope, $ionicModal) {
    this.__placesStream = gsPlaceSearchManager.placesStream;

    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;

    this._initSelectedPositionStream(gsLocationManager.selectedLocationStream);

    this._initPopover($ionicPopover);
  }


  get placesStream() {
    return this.__placesStream;
  }


  get positionStream() {
    return this.__positionStream;
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


  _initSelectedPositionStream(selectedLocationStream) {
    this.__positionStream =
      selectedLocationStream
        .map(({pos}) => pos)
        .publish();

    this.__positionStream.connect();
  }


  _initPopover($ionicPopover) {
    this.__popover =
      $ionicPopover.fromTemplate(popoverTemplate, {scope: this.__$scope});
  }
}
