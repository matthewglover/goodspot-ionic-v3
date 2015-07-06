import LogoutEventListener from './logout-event-listener';

export default (gsUserEvents, auth, store, $state) =>
  new LogoutEventListener(gsUserEvents, auth, store, $state);
