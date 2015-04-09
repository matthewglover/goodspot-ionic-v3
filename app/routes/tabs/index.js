
const TABS_ROUTE_CONFIG = {
  url: "/tab",
  abstract: true,
  template: require('./index.html')
};


const configTabsRoute = ($stateProvider) =>
  $stateProvider.state('tab', TABS_ROUTE_CONFIG);


export default (ngModule) => {

  require('./dash')(ngModule);
  require('./chats')(ngModule);
  require('./chat-detail')(ngModule);
  require('./account')(ngModule);

  ngModule.config(configTabsRoute);
};
