import {isNil} from 'ramda';
import {SEARCH_FOR_LOCATION} from '../../app-constants';
import viewLocationTemplate from '../view-location/template.html'

export default class AddLocationController {

  __$scope
  __gsUserEvents
  __$ionicModal

  __locationSearchResults


  constructor($scope, gsUserEvents, gsLocationSearchManager, $ionicModal) {
    this.__$scope = $scope;
    this.__gsUserEvents = gsUserEvents;
    this.__$ionicModal = $ionicModal;

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
        locationName: this.searchText
      });

    const modal =
      this.__$ionicModal.fromTemplate(viewLocationTemplate, {
        scope: modalScope
      });

    modalScope.__modal = modal;

    modal.show();
  }


  _initLocationSearchResultsStream(locationSearchResultsStream) {
    locationSearchResultsStream
      .do(locations => console.log(locations))
      .subscribe(locations => this.__locationSearchResults = locations);
  }
}
