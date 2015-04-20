import currentLocationFactory from './factory';


export default (ngModule) =>
  ngModule.factory('gsCurrentLocation', currentLocationFactory);
