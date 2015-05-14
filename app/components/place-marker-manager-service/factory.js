import PlaceMarkerManager from './place-marker-manager';

export default (gsPlaceMarkerFactory) =>
  () => new PlaceMarkerManager({gsPlaceMarkerFactory});
