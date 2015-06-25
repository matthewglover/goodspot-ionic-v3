import {isNil, complement} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


import {MAP_BOX_ID} from '../../config';


const isNotNil = complement(isNil);


const MAP_ZOOM = 16;
const IMAGE_FORMAT = 'png';


export default class MapImageController {

  __$scope


  constructor($scope) {
    this.__$scope = $scope;

    this._initElementWidthStream();
  }


  get imagePath() {
    return this.__imagePath;
  }


  _setImagePath(place, imgWidth) {
    if (isNotNil(place)) {
      const imgHeight = Math.round(imgWidth * 2 / 3);

      this.__imagePath =
        `http://api.tiles.mapbox.com/v3/${MAP_BOX_ID}/` +
        `pin-s+ff0000(${place.pos[1]},${place.pos[0]})/` +
        `${place.pos[1]},${place.pos[0]},${MAP_ZOOM}/` +
        `${imgWidth}x${imgHeight}.${IMAGE_FORMAT}`;
    }
  }


  _initElementWidthStream() {
    const unwatch =
      this.__$scope.$watch('elementWidthStream', elementWidthStream => {
        if (isNil(elementWidthStream)) return;
        this._initPlace(elementWidthStream);
      });
  }


  _initPlace(elementWidthStream) {
    const comboStream = Rx.Observable.combineLatest(
      this.placeStream,
      elementWidthStream,
      (a, b) => [a, b]
    );

    comboStream
      .subscribe(([place, width]) => this._setImagePath(place, width));
  }
}
