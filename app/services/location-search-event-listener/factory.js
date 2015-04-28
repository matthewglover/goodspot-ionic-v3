import LocationSearchEventListener from './location-search-event-listener';


export default (gsUserEvents) => {
  const locationSearchEventListener = new LocationSearchEventListener({gsUserEvents});

  return locationSearchEventListener;
};
