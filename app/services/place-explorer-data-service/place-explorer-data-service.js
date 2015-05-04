import Rx from 'rxjs/dist/rx.lite';
import {curry, merge, map, sort} from 'ramda';

import distanceBetween from '../../lib/distance-between';

const addDistanceFrom = curry((position, place) =>
  merge(place, {metersFrom: distanceBetween(position, place.pos)})
);



// const sortByDistance = ([position, places]) => {
//   return pipe(
//     map(addDistanceFrom(position)),
//     sort((p1, p2) => p1.metersFrom - p2.metersFrom)
//   )(places);
// };



export default class PlaceExplorerDataService {

  __placesStream
  __positionStream
  __comboStream

  __crntPosition


  constructor(gsLocationManager, gsPlaceSearchManager) {
    this._initPositionStream(gsLocationManager.selectedLocationStream);
    this._initPlacesStream(gsPlaceSearchManager.placesStream);
    // this._initTest();
  }


  get placesStream() {
    return this.__placesStream;
  }


  get positionStream() {
    return this.__positionStream;
  }


  _initPositionStream(selectedLocationStream) {
    this.__positionStream = new Rx.ReplaySubject(1);

    const rawStream =
      selectedLocationStream
        .map(({pos}) => pos)
        .publish();

    rawStream.connect();

    rawStream.subscribe(pos => this.__positionStream.onNext(pos));
  }


  _initPlacesStream(placesStream) {
    this.__placesStream = new Rx.ReplaySubject(1);

    const comboStream =
      this._buildComboStream(this.positionStream, placesStream);

    const rawStream =
      comboStream
        .map(([position, places]) => map(addDistanceFrom(position), places))
        .map(sort((p1, p2) => p1.metersFrom - p2.metersFrom))
        .publish();

    rawStream.connect();

    rawStream.subscribe(places => this.__placesStream.onNext(places));
  }


  _buildComboStream(positionStream, placesStream) {
    return Rx.Observable.combineLatest(
      positionStream,
      placesStream,
      (positionStream, placesStream) => [positionStream, placesStream]
    );
  }


  // _initTest() {
  //   this.placesStream.subscribe(places => console.log('places stream:::::::', places))
  //   this.positionStream.subscribe(position => console.log('position stream::::::', position))
  // }
}
