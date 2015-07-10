import {partial} from 'ramda';

import buildModal from '../../lib/build-modal';

import locationsTemplate from '../../modals/locations/template.html';
import filterPanelTemplate from '../../modals/filter-panel/template.html';
import placeDetailTemplate from '../../modals/place-detail/template.html';



export default class LocationExplorerOptionsPanelController {


  __$scope
  _buildModal


  constructor($scope, $ionicModal) {
    this.__$scope = $scope;

    this._buildModal = partial(buildModal, $ionicModal);
  }


  changeLocation() {
    const {modal} = this._buildModal(this._getNewScope(), locationsTemplate);
    modal.show();
    this._hideOptions();
  }


  showListView() {
    this._showList();
    this._hideOptions();
  }


  showMapView() {
    this._showMap();
    this._hideOptions();
  }


  showFilterPanel() {
    const {modal} = this._buildModal(this._getNewScope(), filterPanelTemplate);
    modal.show();
    this._hideOptions();
  }


  _getNewScope() {
    return this.__$scope.$new();
  }


  _hideOptions() {
    this.parentCtrl.hideOptions();
  }


  _showList() {
    this.parentCtrl.showList();
  }


  _showMap() {
    this.parentCtrl.showMap();
  }
}
