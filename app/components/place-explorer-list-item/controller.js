

export default class PlaceExplorerListItemController {


  constructor() {
  }


  get placeIcon() {
    if (this.place.placeType !== 'goodspot' || this.place.totalSpots === 0) {
      return 'ion-location stable';
    }else if (this.place.isMyGoodspot) {
      return 'ion-location assertive';
    } else if (this.place.friendSpots > 0) {
      return 'ion-location energized';
    } else {
      return 'ion-location positive';
    }
  }


  get totalSpots() {
    return this.place.totalSpots || 0;
  }


  get friendSpots() {
    return this.place.friendSpots || 0;
  }


  get metersFrom() {
    return this.place.metersFrom;
  }
}
