import PlaceTagEventListener from './place-tag-event-listener';


export default (gsUserEvents, gsUser, gsGoodspotApi) =>
  new PlaceTagEventListener({gsUserEvents, gsUser, gsGoodspotApi});
