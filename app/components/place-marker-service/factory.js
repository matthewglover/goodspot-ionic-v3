import PlaceMarker from './place-marker';

export default (gsPlacePopupFactory, $timeout) =>
  (place, selectPlaceHandler) => new PlaceMarker({place, selectPlaceHandler, gsPlacePopupFactory, $timeout});
