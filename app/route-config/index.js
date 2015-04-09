

// Set default route
const configRoutes = ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/tab/dash');
};


export default (ngModule) => {
  ngModule.config(configRoutes);
};
