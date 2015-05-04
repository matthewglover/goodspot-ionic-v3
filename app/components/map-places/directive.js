import MapPlacesController from './controller';


const link = (scope, element, attributes, mapController) =>
  scope.__mapController = mapController;


export default () =>
  ({
    restrict: 'E',
    replace: true,
    require: '^gsMap',
    scope: {},
    bindToController: {
      searchResultsStream: '=',
      positionStream: '='
    },
    template: '<span></span>',
    link,
    controller: MapPlacesController,
    controllerAs: 'ctrl'
  });
