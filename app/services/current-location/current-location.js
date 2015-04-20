import Rx from 'rxjs/dist/rx.lite';
import {isArrayLike, isEmpty, complement, head} from 'ramda';


const isNotArrayLike = complement(isArrayLike);


export default class CurrentLocation {

  __gsGeocoder
  __locationStream
  __positionStream

  constructor({gsGeocoder, gsGeolocation}) {
    this.__gsGeocoder = gsGeocoder;

    this.__positionStream = gsGeolocation.positionStream;

    this._initLocationStream();
  }


  get locationStream() {
    return this.__locationStream;
  }


  _initLocationStream() {
    this.__locationStream = Rx.Observable.merge(
      this._buildUnResolvedLocationStream(),
      this._buildResolvedLocationStream()
    );
  }


  _buildUnResolvedLocationStream() {
    return this.__positionStream
      .map(pos => ({pos}))
  }


  _buildResolvedLocationStream() {
    return this.__positionStream
      .flatMap(pos => this._reverseGeocode(pos));
  }


  _reverseGeocode(pos) {
    return this.__gsGeocoder.reverse(pos);
  }
}
