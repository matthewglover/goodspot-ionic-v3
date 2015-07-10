import {not, partial} from 'ramda';

import buildModal from '../../../lib/build-modal';


import placeDetailTemplate from '../../../modals/place-detail/template.html';


const popoverTemplate =
  `<gs-location-explorer-options-panel parent-ctrl="ctrl" />`;


export default class ExploreLocationController {

  __$scope
  __gsPlaceExplorerDataService
  __gsLocationManager
  __popover
  __locationName
  __mapVisible
  _buildModal


  constructor($ionicPopover, $scope, $ionicModal, gsPlaceExplorerDataService, gsLocationManager) {
    this.__$scope = $scope;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;
    this._buildModal = partial(buildModal, $ionicModal);

    this.__mapVisible = false;
    this.__showFilterPanel = false;

    this._initPopover($ionicPopover);
    this._initViewEnter();
    this._reactToSelectedLocationStream(gsLocationManager.selectedLocationStream);
  }



  get mapVisible() {
    return this.__mapVisible;
  }


  get listVisible() {
    return not(this.__mapVisible);
  }


  get searchResultsStream() {
    return this.__gsPlaceExplorerDataService.searchResultsStream;
  }


  get positionStream() {
    return this.__gsPlaceExplorerDataService.positionStream;
  }


  get locationName() {
    return this.__locationName || 'Search location...';
  }


  showMap() {
    if (not(this.__mapVisible)) {
      this.__mapVisible = true;
      this._broadcastMapUpdate();
    }
  }


  showList() {
    if (this.__mapVisible) {
      this.__mapVisible = false;
    }
  }


  showOptions($event) {
    this.__popover.show($event);
  }


  hideOptions() {
    this.__popover.hide();
  }


  onSelectPlace(place) {
    const {modal, modalScope} =
      this._buildModal(this._getNewScope(), placeDetailTemplate);
    modalScope.placeId = place.id;
    modal.show();
  }


  _getNewScope() {
    return this.__$scope.$new();
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


  _reactToSelectedLocationStream(selectedLocationStream) {
    selectedLocationStream
      .subscribe(({name}) => this.__locationName = name);
  }
}
