import Rx from 'rxjs/dist/rx.lite';
import {filter, test, append, not} from 'ramda';

import popoverTemplate from './popover-template.html';
import changeLocationTemplate from '../../../modals/change-location/template.html';


export default class ExploreLocationController {

  __$scope
  __$ionicModal
  __gsPlaceExplorerDataService

  __popover


  __showMap
  __showList

  // __filters

  constructor($ionicPopover, $scope, $ionicModal, gsPlaceExplorerDataService) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
    this.__gsPlaceExplorerDataService = gsPlaceExplorerDataService;

    this.__showMap = true;
    this.__showList = false;
    this.__showFilterPanel = false;

    this._initPopover($ionicPopover);

    this._initViewEnter();

    this._initFilterStream();
  }


  get showMap() {
    return this.__showMap;
  }


  get showList() {
    return this.__showList;
  }


  get searchResultsStream() {
    return this.__gsPlaceExplorerDataService.searchResultsStream;
  }


  get positionStream() {
    return this.__gsPlaceExplorerDataService.positionStream;
  }


  get filterStream() {
    return this.__filterStream;
  }


  get showFilterPanel() {
    return this.__showFilterPanel;
  }

  showOptions($event) {
    this.__popover.show($event);
  }


  toggleFilterPanel() {
    this.__showFilterPanel = not(this.__showFilterPanel);
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


  addFilter() {
    const myFilter = filter(({name}) => test(/^Forest/)(name));
    this._addFilter(myFilter);

    this.hideOptions();
  }


  _addFilter(filter) {
    // this.__filters = append(filter, this.__filters);
    // this.__filterStream.onNext(this.__filters);
    this.__gsPlaceExplorerDataService.addFilter(filter);
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


  _initFilterStream() {
    this.__filters = [];

    this.__filterStream =
      new Rx.ReplaySubject(1);

    this.__filterStream
      .onNext(this.__filters);
  }


  _broadcastMapUpdate() {
    this.__$scope.$broadcast('map:updateView')
  }
}
