import Geocoder from './geocoder';


export default ($http) => {

  const geocoder = new Geocoder({$http});

  return geocoder;
};
