import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';

export default class ExploreLocationController {

  __$scope
  __$ionicModal
  __gsPlaceExplorerDataService

  __popover


  __showMap
  __showList

  constructor($ionicPopover, $scope, $ionicModal, gsPlaceExplorerDataService) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.__showMap = true;
    this.__showList = false;

    this._initPopover($ionicPopover);

    this._initViewEnter();
  }


  get showMap() {
    return this.__showMap;
  }


  get showList() {
    return this.__showList;
  }


  get placesStream() {
    return this.__gsPlaceExplorerDataService.placesStream;
  }


  get positionStream() {
    return this.__gsPlaceExplorerDataService.positionStream;
  }


  showOptions($event) {
    this.__popover.show($event);
  }


  hideOptions() {
    this.__popover.hide();
  }


  showListView() {
    this.__showMap = false;
    this.__showList = true;
    this.hideOptions();
  }


  showMapView() {
    this.__showMap = true;
    this.__showList = false;
    this._broadcastMapUpdate();
    this.hideOptions();
  }


  changeLocation() {
    this._buildModal();
    this.hideOptions();
  }


  _buildModal() {
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
