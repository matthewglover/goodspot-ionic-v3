import PlaceExplorerDataService from './place-explorer-data-service';

export default (gsLocationManager, gsPlaceSearchManager) => {
  const placeExplorerDataService =
    new PlaceExplorerDataService(gsLocationManager, gsPlaceSearchManager);

  return placeExplorerDataService;
};
