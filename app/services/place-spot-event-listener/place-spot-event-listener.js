import {SPOT_PLACE} from '../../app-constants';


export default class PlaceSpotEventListener {

  __gsUserEvents
  __gsGoodspotApi
  __gsUser


  constructor({gsUserEvents, gsUser, gsGoodspotApi}) {
    this.__gsUserEvents = gsUserEvents;
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__gsUser = gsUser;

    this._initSpotPlaceEvents();
  }


  _initSpotPlaceEvents() {
    const spotPlaceEventStream =
      this.__gsUserEvents.getEventStream(SPOT_PLACE);

    spotPlaceEventStream
      .flatMap(place => this._spotPlace(place))
      .forEach(angular.noop);
  }


  _spotPlace(place) {
    const personId = this.__gsUser.userId;
    return this.__gsGoodspotApi.createPlace(personId, place);
  }
}
