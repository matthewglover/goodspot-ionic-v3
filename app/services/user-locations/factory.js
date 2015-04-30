import UserLocations from './user-locations';


export default (gsGoodspotApi, gsUser, gsLocationCreateEventListener) => {
  const userLocations = new UserLocations({gsGoodspotApi, gsUser, gsLocationCreateEventListener});

  return userLocations;
};
