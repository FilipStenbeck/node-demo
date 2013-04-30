'use strict';
angular.module('frontendAngularApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/edit/:id', {
        templateUrl: 'views/editUser.html',
        controller: 'EditUserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
