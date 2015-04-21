import PlaceMarker from './place-marker';

export default (gsPlacePopupFactory) =>
  (place) => new PlaceMarker(place, gsPlacePopupFactory);
