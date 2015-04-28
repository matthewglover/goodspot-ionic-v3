import UserLocations from './user-locations';


export default (gsGoodspotApi, gsUser) => {
  const userLocations = new UserLocations({gsGoodspotApi, gsUser});

  return userLocations;
};
