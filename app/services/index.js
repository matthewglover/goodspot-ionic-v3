import chats from './chats';
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
import gsPlaceUnspotEventListener from './place-unspot-event-listener';
import gsPlaceSearch from './place-search';
import gsLocationSearchEventListener from './location-search-event-listener';
import gsLocationCreateEventListener from './location-create-event-listener';
import gsLocationDeleteEventListener from './location-delete-event-listener';
import gsLocationEditEventListener from './location-edit-event-listener';
import gsUserLocations from './user-locations';
import gsLocationSearchManager from './location-search-manager';
import gsPlaceExplorerDataService from './place-explorer-data-service';
import gsPlaceFilter from './place-filter';
import gsPlaceSort from './place-sort';
import gsPersonFriends from './person-friends';
import gsPlaceTagEventListener from './place-tag-event-listener';
import gsPlaceUntagEventListener from './place-untag-event-listener';
import gsLogoutEventListener from './logout-event-listener';

export default (ngModule) => {
  chats(ngModule);
  gsPubSub(ngModule);
  gsDispatcher(ngModule);
  gsActions(ngModule);
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
  gsPlaceUnspotEventListener(ngModule);
  gsPlaceSearch(ngModule);
  gsLocationSearchEventListener(ngModule);
  gsLocationCreateEventListener(ngModule);
  gsLocationDeleteEventListener(ngModule);
  gsLocationEditEventListener(ngModule);
  gsUserLocations(ngModule);
  gsLocationSearchManager(ngModule);
  gsPlaceExplorerDataService(ngModule);
  gsPlaceFilter(ngModule);
  gsPlaceSort(ngModule);
  gsPersonFriends(ngModule);
  gsPlaceTagEventListener(ngModule);
  gsPlaceUntagEventListener(ngModule);
  gsLogoutEventListener(ngModule);
};
