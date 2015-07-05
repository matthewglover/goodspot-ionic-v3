import {configAuth, initAuth} from './auth-config';
import {configIonic, initIonicPlatform} from './ionic-config';
import {configRoutes} from './routes-config';


const initServices = (gsGeolocation,
                      gsCurrentLocation,
                      gsLocationManager,
                      gsPlaceSearchManager,
                      gsPlaceExplorerDataService,
                      gsPlaceFilter,
                      gsPersonFriends,
                      gsPlaceSort,
                      gsPerson,
                      gsUserEvents) => {};



export default (ngModule) => {
  console.log('configuring and initialising app');

  // Auth
  ngModule.config(configAuth);
  ngModule.run(initAuth);

  // Ionic
  ngModule.config(configIonic);
  ngModule.run(initIonicPlatform);

  // Routes
  ngModule.config(configRoutes);

  // Services
  ngModule.run(initServices);
};
