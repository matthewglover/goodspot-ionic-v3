import PlaceUntagEventListener from './place-untag-event-listener';


export default (gsUserEvents, gsUser, gsGoodspotApi) =>
  new PlaceUntagEventListener({gsUserEvents, gsUser, gsGoodspotApi});
