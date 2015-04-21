import PlaceMarkerManager from './place-marker-manager';

export default (gsPlaceMarkerFactory) => {
  const placeMarkerManager = new PlaceMarkerManager({gsPlaceMarkerFactory});

  return placeMarkerManager
};
