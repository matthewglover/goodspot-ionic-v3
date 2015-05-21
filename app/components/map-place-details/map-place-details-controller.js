import {isNil, not} from 'ramda';
import {SPOT_PLACE} from '../../app-constants';


export default class MapPlaceDetailsController {

  __gsUserEvents

  constructor(gsUserEvents) {
    this.__gsUserEvents = gsUserEvents;
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

  tagPlace() {
    console.log('tagging place', this.place);  //TODO: add tag place logic
  }


  _raiseEvent(...args) {
    this.__gsUserEvents.raiseEvent(...args);
  }
}
