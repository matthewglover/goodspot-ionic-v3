import {not} from 'ramda';

import popoverTemplate from './popover-template.html';
import locationsTemplate from '../../../modals/locations/template.html';
import filterPanelTemplate from '../../../modals/filter-panel/template.html';
import placeDetailTemplate from '../../../modals/place-detail/template.html';


export default class ExploreLocationController {

  __$scope
  __$ionicModal
  __gsPlaceExplorerDataService
  __gsLocationManager

  __popover

  __locationName

  __showMap


  constructor($ionicPopover, $scope, $ionicModal, gsPlaceExplorerDataService, gsLocationManager) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.__showMap = true;
    this.__showFilterPanel = false;

    this._initPopover($ionicPopover);

    this._initViewEnter();

    this._reactToSelectedLocationStream(gsLocationManager.selectedLocationStream);
  }


  get showMap() {
    return this.__showMap;
  }


  get showList() {
    return not(this.__showMap);
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

  showOptions($event) {
    this.__popover.show($event);
  }


  showFilterPanel() {
    const {modal} = this._buildModal(filterPanelTemplate);
    modal.show();
    this.hideOptions();
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
    const {modal} = this._buildModal(locationsTemplate);
    modal.show();
    this.hideOptions();
  }


  onSelectPlace(place) {
    const {modal, modalScope} = this._buildModal(placeDetailTemplate);
    modalScope.placeId = place.id;
    modal.show();
  }


  _buildModal(modalTemplate) {
    const modalScope = this.__$scope.$new();
    const modal =
      this.__$ionicModal.fromTemplate(modalTemplate, {scope: modalScope});

    modalScope.__modal = modal;

    return {modal, modalScope};
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
