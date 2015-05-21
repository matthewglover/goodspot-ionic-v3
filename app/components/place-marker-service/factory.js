import PlaceMarker from './place-marker';

export default (gsPlacePopupFactory) =>
  (place, selectPlaceHandler) => new PlaceMarker({place, selectPlaceHandler, gsPlacePopupFactory});
