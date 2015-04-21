// Set the public path (used in font loading)
global.__webpack_public_path__ = 'assets/';


require('../scss/ionic.app.scss');
require('./css/mapbox.uncompressed.css');
require('./css/MarkerCluster.Default.css');
require('./css/MarkerCluster.css');


// Include ionic and angular js files
// Includes from Bower so declare global variables: ionic and angular
require('auth0.js');
require('ionic/js/ionic');
require('mapbox.js/mapbox.uncompressed');
require('leaflet.markercluster/dist/leaflet.markercluster');

require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');

require('ionic/js/ionic-angular');
require('auth0-angular');
require('a0-angular-storage/dist/angular-storage');
require('angular-jwt');
require('ngCordova');


const appDependencies = [
  'ionic',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ngCordova'
];


// Create app module with ionic dependency
const ngApp = angular.module('goodspotApp', appDependencies);


// Run app provisioning functions
// Each function take the angular app instance and adds functionality to it

import services from './services';
import components from './components';
import routes from './routes';

import ionicConfig from './config-ionic';
import routeConfig from './config-route';
import authConfig from './config-auth';
// import loadingIndicatorConfig from './config-loading-indicator';
import geoLocationConfig from './config-geolocation';
import userConfig from './config-user';
import userEventsConfig from './config-user-events';

services(ngApp);
components(ngApp);
routes(ngApp);

ionicConfig(ngApp);
routeConfig(ngApp);
authConfig(ngApp);
// loadingIndicatorConfig(ngApp);
geoLocationConfig(ngApp);
userConfig(ngApp);
userEventsConfig(ngApp);


import init from './init';

init(ngApp);