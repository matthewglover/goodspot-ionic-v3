import GoodspotApi from './goodspot-api';


export default ($http) => {
  const goodspotApi = new GoodspotApi({$http});

  return goodspotApi;
}
