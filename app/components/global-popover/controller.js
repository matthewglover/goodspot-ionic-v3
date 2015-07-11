import {GEOLOCATION_ERROR} from '../../app-constants';

export default class GlobalPopoverController {



  __$ionicActionSheet


  constructor($ionicActionSheet, gsUserEvents) {
    this.__$ionicActionSheet = $ionicActionSheet;

    gsUserEvents
      .getEventStream(GEOLOCATION_ERROR)
      .subscribe(err => this._showGeolocationActionSheet(err))
  }



  _showGeolocationActionSheet(err) {

    const hideSheet = this.__$ionicActionSheet.show({
      titleText: `Oops - can't find your location`,
      buttons: [
        {text: 'Try again'},
        {text: 'Load default'}
      ],
      buttonClicked: (index) => {
        switch(index) {
        case 0 :
          return this._retryGeolocation(hideSheet);
        case 1 :
          return this._loadDefaultGeolocation(hideSheet);
        }
      },
      cancelOnStateChange: false
    });
  }


  _retryGeolocation(hideSheet) {
    console.log('retrying geolocation');
    hideSheet();
  }


  _loadDefaultGeolocation(hideSheet) {
    console.log('loading default geolocation');
    hideSheet();
  }
}
