import CurrentLocation from './current-location';


const currentLocationFactory = (gsGeocoder, gsGeolocation, $log) => {

  const currentLocation = new CurrentLocation({gsGeocoder, gsGeolocation});

  return currentLocation;
};


export default currentLocationFactory;
