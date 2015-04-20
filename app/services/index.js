import chats from './chats';
import gsAuth from './auth';
import gsPubSub from './util/pub-sub';
import gsActions from './actions';
import gsDispatcher from './dispatcher';
import gsGeolocation from './geolocation';
import gsGecoder from './geocoder';
import gsCurrentLocation from './current-location';
import gsLocationManager from './location-manager';
import gsPlaceSearchManager from './place-search-manager';
import gsFactualSearch from './factual-search';
import gsUser from './user';
import gsPerson from './person';
import gsGoodspotApi from './goodspot-api'
import gsUserEvents from './user-events';
import gsPlaceSpotEventListener from './place-spot-event-listener';
import gsPlaceSearch from './place-search';


export default (ngModule) => {
  chats(ngModule);
  gsPubSub(ngModule);
  gsDispatcher(ngModule);
  gsActions(ngModule);
  gsAuth(ngModule);
  gsGeolocation(ngModule);
  gsGecoder(ngModule);
  gsCurrentLocation(ngModule);
  gsLocationManager(ngModule);
  gsPlaceSearchManager(ngModule);
  gsFactualSearch(ngModule);
  gsUser(ngModule);
  gsPerson(ngModule);
  gsGoodspotApi(ngModule);
  gsUserEvents(ngModule);
  gsPlaceSpotEventListener(ngModule);
  gsPlaceSearch(ngModule);
};
