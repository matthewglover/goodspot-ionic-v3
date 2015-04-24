import PlaceSearchManager from './place-search-manager';

export default (gsLocationManager, gsPlaceSearch, gsUser, gsPlaceSpotEventListener) => {
  const placeSearchManager = new PlaceSearchManager({gsLocationManager, gsPlaceSearch, gsUser, gsPlaceSpotEventListener});

  return placeSearchManager;
};
