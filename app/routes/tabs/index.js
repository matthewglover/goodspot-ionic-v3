import dash from './dash';
import chats from './chats';
import chatDetail from './chat-detail';
import account from './account';
import exploreLocation from './explore-location';
import template from './index.html';


const TABS_ROUTE_CONFIG = {
  url: "/tab",
  abstract: true,
  data: {requiresLogin: true},
  template
};


const configTabsRoute = ($stateProvider) =>
  $stateProvider.state('tab', TABS_ROUTE_CONFIG);


export default (ngModule) => {

  dash(ngModule);
  chats(ngModule);
  chatDetail(ngModule);
  account(ngModule);
  exploreLocation(ngModule);

  ngModule.config(configTabsRoute);
};
