

export default class MapController {

  __$scope

  constructor($scope) {
    this.__$scope = $scope;
  }

  get map() {
    return this.__$scope.map
  }
}
