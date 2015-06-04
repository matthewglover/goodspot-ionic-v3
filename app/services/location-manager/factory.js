import LocationManager from './location-manager';

const factory = (gsLocationCreateEventListener, gsLocationDeleteEventListener, gsLocationEditEventListener) =>
  new LocationManager(gsLocationCreateEventListener, gsLocationDeleteEventListener, gsLocationEditEventListener);


export default factory;
