import geocoderFactory from './factory';

export default (ngModule) =>
  ngModule.factory('gsGeocoder', geocoderFactory);
