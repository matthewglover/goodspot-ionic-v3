import LocationDeleteEventListener from './location-delete-event-listener';

export default (gsUserEvents, gsUser, gsGoodspotApi) =>
  new LocationDeleteEventListener({gsUserEvents, gsUser, gsGoodspotApi});
