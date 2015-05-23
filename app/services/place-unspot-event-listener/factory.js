import PlaceUnspotEventListener from './place-unspot-event-listener';


export default (gsUserEvents, gsUser, gsGoodspotApi) =>
  new PlaceUnspotEventListener({gsUserEvents, gsUser, gsGoodspotApi});
