import LocationEditEventListener from './location-edit-event-listener';

export default (gsUserEvents, gsUser, gsGoodspotApi) =>
  new LocationEditEventListener({gsUserEvents, gsUser, gsGoodspotApi});
