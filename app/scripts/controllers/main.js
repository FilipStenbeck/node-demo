'use strict';

angular.module('frontendAngularApp').controller('MainCtrl', function ($scope, userService) { 
    $scope.activeOnly = false;
    userService.getUsers(false, function(data) {
        $scope.users  = data;
    });
    
    $scope.onReload = function() {
        userService.getUsers($scope.activeOnly, function(data) {
            $scope.users  = data;
        });
    }
    
});
