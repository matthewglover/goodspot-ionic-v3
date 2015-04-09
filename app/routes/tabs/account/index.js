
const TAB_ACCOUNT_ROUTE_CONFIG = {
  url: '/account',
  views: {
    'tab-account': {
      template: require('./index.html'),
      controller: 'AccountCtrl'
    }
  }
};


const configTabAccountRoute = ($stateProvider) =>
  $stateProvider.state('tab.account', TAB_ACCOUNT_ROUTE_CONFIG);


export default (ngModule) => {

  ngModule.config(configTabAccountRoute);

  ngModule.controller('AccountCtrl', function($scope) {});
};
