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


const ngDependencies = ['ionic'];


const ngApp = angular.module('goodspotApp', ngDependencies);


require('./ionic-config')(ngApp);
require('./route-config')(ngApp);
require('./routes')(ngApp);
require('./services')(ngApp);
