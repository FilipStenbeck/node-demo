'use strict';

angular.module('frontendAngularApp')
  .directive('userList', function () {
    return {
      templateUrl: 'views/userListTemplate.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
