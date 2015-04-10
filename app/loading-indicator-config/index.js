// import template from './template.html';


const LOADING_OPTIONS = {
  template: '<div><ion-spinner icon="ripple"></ion-spinner></div>',
  delay: 500,
  noBackdrop: false,
};


const initLoadingIndicator = ($rootScope, $ionicLoading) => {
  $rootScope.$on('loading:show', () => $ionicLoading.show(LOADING_OPTIONS));
  $rootScope.$on('loading:hide', () => $ionicLoading.hide());
};


const httpInterceptor = ($rootScope) =>
  ({
    request: (config) => {
      $rootScope.$broadcast('loading:show');
      return config;
    },
    response: (response) => {
      $rootScope.$broadcast('loading:hide');
      return response;
    }
  });

const configHttpInterceptor = ($httpProvider) => {
  $httpProvider.interceptors.push(httpInterceptor);
}


export default (ngModule) => {
  ngModule.config(configHttpInterceptor);
  ngModule.run(initLoadingIndicator);
};
