import PlaceMarkerManager from './place-marker-manager';

export default (gsPlaceMarkerFactory) =>
  () => {
    // debugger;
    const placeMarkerManager = new PlaceMarkerManager({gsPlaceMarkerFactory});

    return placeMarkerManager
  };
