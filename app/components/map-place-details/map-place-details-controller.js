import {isNil, not} from 'ramda';
import {SPOT_PLACE} from '../../app-constants';


export default class MapPlaceDetailsController {

  __gsUserEvents

  __place;


  constructor(gsUserEvents) {
    this.__gsUserEvents = gsUserEvents;
  }

  set place(place) {
    this.__place = place;
  }


  get place() {
    return this.__place;
  }


  get placeName() {
    return this.place.name;
  }


  get totalGoodspots() {
    if (isNil(this.place.goodspots)) return 0
    else return 10000     //TODO: add goodspot logic
  }


  get isMyGoodspot() {
    return this.place.isMyGoodspot;
  }


  get isNotMyGoodspot() {
    return not(this.isMyGoodspot);
  }


  spotPlace() {
    this._raiseEvent(SPOT_PLACE, this.place);
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }
}
