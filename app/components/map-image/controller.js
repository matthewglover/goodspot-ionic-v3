import {isNil, complement} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


import {MAP_BOX_ID} from '../../config';


const isNotNil = complement(isNil);


const MAP_ZOOM = 14;
const IMAGE_FORMAT = 'png';


export default class MapImageController {

  __$scope
  __imagePath
  __imageStyles


  constructor($scope) {
    this.__$scope = $scope;

    this._initElementWidthStream();
  }


  get imagePath() {
    return this.__imagePath;
  }


  get imageStyles() {
    return this.__imageStyles;
  }


  _calcImageHeight(imgWidth) {
    return imgWidth > 0 ?
      Math.round(imgWidth * 2 / 3) :
      0;
  }


  _setImageStyles(imgWidth, imgHeight) {
    this.__imageStyles = {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`
    };
  }


  _setImagePath(place, imgWidth, imgHeight) {
    if (isNotNil(place)) {
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
      .subscribe(([place, width]) => {
        const height = this._calcImageHeight(width);
        this._setImagePath(place, width, height);
        this._setImageStyles(width, height);
      });
  }
}
