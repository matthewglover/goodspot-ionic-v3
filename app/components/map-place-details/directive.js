import template from './template.html';
import MapPlaceDetailsController from './map-place-details-controller';

export default () =>
  ({
    restrict: 'E',
    replace: true,
    scope: {
      place: '=',
      selectPlaceHandler: '='
    },
    template,
    controller: MapPlaceDetailsController,
    controllerAs: 'ctrl',
    bindToController: true
  });
