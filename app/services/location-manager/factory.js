import LocationManager from './location-manager';

const factory = (gsLocationCreateEventListener) => {
  const locationManager = new LocationManager(gsLocationCreateEventListener);

  return locationManager;
};


export default factory;
