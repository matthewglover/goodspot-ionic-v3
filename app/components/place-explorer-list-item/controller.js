

export default class PlaceExplorerListItemController {
  constructor() {
    console.log(this.place);
  }


  get placeIcon() {
    if (this.place.placeType !== 'goodspot') {
      return 'ion-ios-location stable';
    }else if (this.place.isMyGoodspot) {
      return 'ion-ios-location assertive';
    } else if (this.place.friendSpots > 0) {
      return 'ion-ios-location energized';
    } else {
      return 'ion-ios-location positive';
    }
  }


  get totalSpots() {
    return this.place.totalSpots || 0;
  }


  get friendSpots() {
    return this.place.friendSpots || 0;
  }
}
