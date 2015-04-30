import LocationManager from './location-manager';

const factory = (gsCurrentLocation, gsLocationSearchEventListener, gsGeocoder, gsUserLocations) => {
  const locationManager = new LocationManager({gsCurrentLocation, gsLocationSearchEventListener, gsGeocoder, gsUserLocations});

  return locationManager;
};


export default factory;
