import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';

export default class ExploreLocationController {

  __$scope
  __$ionicModal

  __popover


  __showMap

  constructor($ionicPopover, $scope, $ionicModal) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;

    this.__showMap = true;

    this._initPopover($ionicPopover);

    this._initViewEnter();
  }


  get showMap() {
    return this.__showMap;
  }


  showOptions($event) {
    this.__popover.show($event);
  }


  showListView() {
    this.__showMap = false;
  }


  showMapView() {
    this.__showMap = true;
    this._broadcastMapUpdate();
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


  _initViewEnter() {
    this.__$scope.$on('$ionicView.enter', () => {
      this._broadcastMapUpdate();
    })
  }


  _broadcastMapUpdate() {
    this.__$scope.$broadcast('map:updateView')
  }
}
