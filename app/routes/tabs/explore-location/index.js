import template from './index.html';
import ExploreLocationController from './controller';


const EXPLORE_LOCATION_ROUTE_CONFIG = {
  url: '/explore-location',
  views: {
    'tab-explore-location': {
      template,
      controller: 'ExploreLocationController as ctrl'
    }
  }
};


const configTabExploreLocationRoute = ($stateProvider) =>
  $stateProvider.state('tab.explore-location', EXPLORE_LOCATION_ROUTE_CONFIG);


export default (ngModule) => {
  ngModule.config(configTabExploreLocationRoute);
  ngModule.controller('ExploreLocationController', ExploreLocationController);
};
