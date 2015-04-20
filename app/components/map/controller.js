

export default class MapController {

  __$scope

  constructor($scope) {
    console.log('Initialising map controller');

    this.__$scope = $scope;
  }

  get map() {
    return this.__$scope.map
  }
}
