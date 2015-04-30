import LocationSearchManager from './location-search-manager';

export default (gsLocationSearchEventListener, gsGeocoder) => {
  const locationSearchManager = new LocationSearchManager({gsLocationSearchEventListener, gsGeocoder});

  return locationSearchManager;
}
