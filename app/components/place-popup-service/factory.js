import PlacePopup from './place-popup';

export default ($compile, $rootScope) =>
  (place) => new PlacePopup(place, $compile, $rootScope);
