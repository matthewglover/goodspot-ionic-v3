import PlaceSpotEventListener from './place-spot-event-listener';


export default (gsUserEvents, gsUser, gsGoodspotApi) => {
  const placeSpotEventListener = new PlaceSpotEventListener({gsUserEvents, gsUser, gsGoodspotApi});

  return placeSpotEventListener;
};
