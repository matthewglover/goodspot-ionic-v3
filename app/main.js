// Set the public path (used in font loading)
global.__webpack_public_path__ = 'assets/';


// Include ionic and angular js files
// Includes from Bower so declare global variables: ionic and angular
require('ionic/js/ionic');
require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');
require('ionic/js/ionic-angular');
require('../scss/ionic.app.scss');


// Create app module with ionic dependency
const ngApp = angular.module('goodspotApp', ['ionic']);



// Run app provisioning functions
// Each function take the angular app instance and adds functionality to it

import ionicConfig from './ionic-config';
import routeConfig from './route-config';
import routes from './routes';
import services from './services';

ionicConfig(ngApp);
routeConfig(ngApp);
routes(ngApp);
services(ngApp);
