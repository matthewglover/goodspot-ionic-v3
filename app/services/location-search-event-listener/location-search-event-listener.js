import {SEARCH_FOR_LOCATION} from '../../app-constants';


export default class LocationSearchEventListener {

  __gsUserEvents
  __eventStream


  constructor({gsUserEvents}) {
    this.__eventStream =
      gsUserEvents
        .getEventStream(SEARCH_FOR_LOCATION)
        .map(evt => evt.searchText);
  }


  get eventStream() {
    return this.__eventStream;
  }
}
