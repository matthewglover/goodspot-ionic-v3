import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';

export default class ExploreLocationController {

  __$scope
  __$ionicModal

  __popover

  constructor($ionicPopover, $scope, $ionicModal) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;

    this._initPopover($ionicPopover);
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


  _initPopover($ionicPopover) {
    this.__popover =
      $ionicPopover.fromTemplate(popoverTemplate, {scope: this.__$scope});
  }
}
