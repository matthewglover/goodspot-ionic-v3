import LocationManager from './location-manager';

const factory = (gsCurrentLocation, gsLocationSearchEventListener, gsGeocoder, gsLocationCreateEventListener, gsUserLocations) => {
  const locationManager = new LocationManager({gsCurrentLocation, gsLocationSearchEventListener, gsGeocoder, gsLocationCreateEventListener, gsUserLocations});

  return locationManager;
};


export default factory;
