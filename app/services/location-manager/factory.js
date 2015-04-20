import LocationManager from './location-manager';

const factory = (gsCurrentLocation) => {
  const locationManager = new LocationManager({gsCurrentLocation});

  return locationManager;
};


export default factory;
