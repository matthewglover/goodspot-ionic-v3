
const TAB_DASH_ROUTE_CONFIG = {
  url: '/dash',
  views: {
    'tab-dash': {
      template: require('./index.html'),
      controller: 'DashCtrl'
    }
  }
};


const configTabDashRoute = ($stateProvider) =>
  $stateProvider.state('tab.dash', TAB_DASH_ROUTE_CONFIG);


export default (ngModule) => {

  ngModule.config(configTabDashRoute);

  ngModule.controller('DashCtrl', function($scope) {});
};
