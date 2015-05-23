import PlaceSearchManager from './place-search-manager';

export default (
  gsLocationManager,
  gsPlaceSearch,
  gsUser,
  gsPlaceSpotEventListener,
  gsPlaceUnspotEventListener,
  gsPlaceTagEventListener,
  gsPlaceUntagEventListener) =>
  new PlaceSearchManager({
    gsLocationManager,
    gsPlaceSearch,
    gsUser,
    gsPlaceSpotEventListener,
    gsPlaceUnspotEventListener,
    gsPlaceTagEventListener,
    gsPlaceUntagEventListener
  });
