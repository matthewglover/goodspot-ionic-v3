import {isNil, partial} from 'ramda';
import {SEARCH_FOR_LOCATION} from '../../app-constants';
import viewLocationTemplate from '../view-location/template.html'
import buildModal from '../../lib/build-modal';

export default class AddLocationController {

  __$scope
  __gsUserEvents
  __locationSearchResults
  _buildModal


  constructor($scope, gsUserEvents, gsLocationSearchManager, $ionicModal) {
    this.__$scope = $scope;
    this.__gsUserEvents = gsUserEvents;
    this._buildModal = partial(buildModal, $ionicModal);

    this._initLocationSearchResultsStream(gsLocationSearchManager.locationSearchResultsStream);
  }


  get locationSearchResults() {
    return this.__locationSearchResults;
  }


  set searchText(searchText) {
    this.__searchText = searchText;
  }


  get searchText() {
    return this.__searchText;
  }


  search() {
    this.__gsUserEvents
      .raiseEvent(SEARCH_FOR_LOCATION, {searchText: this.searchText});
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  viewLocation(location) {
    const modalScope =
      angular.extend(this.__$scope.$new(), {
        location,
        locationName: this.searchText,
        parent: this
      });

    const {modal} = this._buildModal(modalScope, viewLocationTemplate);

    modal.show();
  }


  _initLocationSearchResultsStream(locationSearchResultsStream) {
    locationSearchResultsStream
      .subscribe(locations => this.__locationSearchResults = locations);
  }
}
