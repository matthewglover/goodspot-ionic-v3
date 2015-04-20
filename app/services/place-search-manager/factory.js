import PlaceSearchManager from './place-search-manager';

export default (gsLocationManager, gsPlaceSearch, gsUser) => {
  const placeSearchManager = new PlaceSearchManager({gsLocationManager, gsPlaceSearch, gsUser});

  return placeSearchManager;
};
