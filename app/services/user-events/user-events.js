import {propEq, prop} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';

let counter = 0;

export default class UserEvents {

  __eventStream
  __outStream

  constructor() {
    this.__eventStream = new Rx.Subject();
    this.__outStream = this.__eventStream.publish();
    this.__outStream.connect();
  }


  getEventStream(eventType) {
    return this.__outStream
      .filter(propEq('eventType', eventType))
      .map(prop('payload'));
  }


  raiseEvent(eventType, payload) {
    console.log(eventType, payload);
    this.__eventStream.onNext({eventType, payload});
  }
}
