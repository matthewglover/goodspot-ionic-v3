import MapPlacesController from './controller';


const link = (scope, element, attributes, mapController) =>
  scope.__mapController = mapController;

<<<<<<< HEAD
export default (gsPlaceMarkerManager) =>
=======

export default () =>
>>>>>>> map-synchro
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
