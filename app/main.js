// Set the public path (used in font loading)
global.__webpack_public_path__ = 'assets/';


require('../scss/ionic.app.scss');


// Include ionic and angular js files
// Includes from Bower so declare global variables: ionic and angular
require('auth0.js');
require('ionic/js/ionic');

require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');

require('ionic/js/ionic-angular');
require('auth0-angular');
require('a0-angular-storage/dist/angular-storage');
require('angular-jwt');


const appDependencies = [
  'ionic',
  'auth0',
  'angular-storage',
  'angular-jwt'
];


// Create app module with ionic dependency
const ngApp = angular.module('goodspotApp', appDependencies);


// Run app provisioning functions
// Each function take the angular app instance and adds functionality to it

import ionicConfig from './ionic-config';
import services from './services';
import routeConfig from './route-config';
import authConfig from './auth-config';
import loadingIndicatorConfig from './loading-indicator-config';
import routes from './routes';


ionicConfig(ngApp);
services(ngApp);
routeConfig(ngApp);
authConfig(ngApp);
loadingIndicatorConfig(ngApp);
routes(ngApp);
