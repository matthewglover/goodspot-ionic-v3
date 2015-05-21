import PlacePopup from './place-popup';

export default ($compile, $rootScope) =>
  (place, selectPlaceHandler) => new PlacePopup({place, selectPlaceHandler, $compile, $rootScope});
