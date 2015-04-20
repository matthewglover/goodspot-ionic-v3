import {propEq, prop} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


export default class UserEvents {

  __eventStream

  constructor() {
    this.__eventStream = new Rx.Subject();
  }


  getEventStream(eventType) {
    return this.__eventStream
      .filter(propEq('eventType', eventType))
      .map(prop('payload'));
  }


  raiseEvent(eventType, payload) {
    // console.log('raising event', eventType, payload);
    this.__eventStream.onNext({eventType, payload});
  }
}
