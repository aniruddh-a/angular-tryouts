'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',  
  'WeatherAppApi',
  'MainView'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainView', {templateUrl: 'js/components/main-view/main-view.html', controller: 'mainViewController'});
  $routeProvider.otherwise({redirectTo: '/mainView'});
}]);


