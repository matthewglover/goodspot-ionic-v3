import LocationCreateEventListener from './location-create-event-listener';

export default (gsUserEvents, gsUser, gsGoodspotApi) => {
  const locationCreateEventListener =
    new LocationCreateEventListener({gsUserEvents, gsUser, gsGoodspotApi});

  return locationCreateEventListener;
};
