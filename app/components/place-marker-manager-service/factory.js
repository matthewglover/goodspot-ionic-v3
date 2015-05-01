import PlaceMarkerManager from './place-marker-manager';

export default (gsPlaceMarkerFactory, $timeout) => {
  const placeMarkerManager = new PlaceMarkerManager({gsPlaceMarkerFactory, $timeout});

  return placeMarkerManager
};
