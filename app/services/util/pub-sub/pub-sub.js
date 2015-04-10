import {isNil, is, isArrayLike, reject, forEach} from 'ramda';

// EventObject = {fn: Function, context: Object|Nil}

class PubSub {

  constructor() {
    this.__subscribers = [];
  }


  // String, String, Function, Object -> Nil
  subscribe(objName, eventName, fn, context) {
    this._getEventArray(objName, eventName)
      .push({fn, context});
  }


  // String, String, Function -> Nil
  unsubscribe(objName, eventName, fn) {
    if (this._isUnregisteredEventType(objName, eventName)) throw new Error('Unregistered event cannot be unregistered');

    const eventArray = this._getEventArray(objName, eventName);
    const newEventArray = reject(v => v.fn === fn)(eventArray);
    this._setEventArray(objName, eventName, newEventArray);
  }


  // String, String -> Nil
  publish(objName, eventName, ...args) {
    if (this._isUnregisteredEventType(objName, eventName)) return;

    const eventArray = this._getEventArray(objName, eventName);

    forEach(v => v.fn.apply(v.context, args))(eventArray);
  }


  // String, String -> Array<EventObject>
  _getEventArray(objName, eventName) {
    if (isNil(this.__subscribers[objName])) this.__subscribers[objName] = {};
    if (isNil(this.__subscribers[objName][eventName])) this.__subscribers[objName][eventName] = [];
    return this.__subscribers[objName][eventName];
  }


  // String, String, Array -> Nil
  _setEventArray(objName, eventName, eventArray) {
    let arr = this._getEventArray(objName, eventName);
    arr = eventArray;
  }


  // String, String -> Boolean
  _isUnregisteredEventType(objName, eventName) {
    return !this._isRegisteredEventType(objName, eventName);
  }


  // String, String -> Boolean
  _isRegisteredEventType(objName, eventName) {
    return is(Object)(this.__subscribers[objName]) &&
      isArrayLike(this.__subscribers[objName][eventName]);
  }
}


export default PubSub;
