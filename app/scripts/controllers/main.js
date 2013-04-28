'use strict';

angular.module('frontendAngularApp').controller('MainCtrl', function ($scope, userService) { 
    userService.getUsers(false, function(data) {
        //List of the objects
        $scope.users  = data;
    });
});
