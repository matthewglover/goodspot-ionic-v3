import {isNil} from 'ramda';


export default class FilterPanelController {

  __$scope

  constructor($scope) {
    this.__$scope = $scope;
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }
}
