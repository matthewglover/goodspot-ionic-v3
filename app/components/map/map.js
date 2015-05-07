
export default class Map {

  constructor(scope, domElement) {
    scope.$broadcast('map:loaded', domElement);
  }
}
