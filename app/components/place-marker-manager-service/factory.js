import PlaceMarkerManager from './place-marker-manager';

export default (gsPlaceMarkerFactory) =>
  (selectPlaceHandler) =>
    new PlaceMarkerManager({gsPlaceMarkerFactory, selectPlaceHandler});
