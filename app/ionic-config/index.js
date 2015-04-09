

// Initialize Ionic platform (as per ionic boilerplate)
const initIonicPlatform = ($ionicPlatform) => {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
};


export default (ngModule) => {
  ngModule.run(initIonicPlatform);
};
