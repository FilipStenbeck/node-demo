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
    };
    
    $scope.newUser = function() {
        if ($scope.isActive === undefined) {
            $scope.isActive = false;
        }
        var user = {
            id : 'NEW',
            name :  $scope.username,
            isActive : $scope.isActive
        }
        userService.newUser(user, function(data) {
            $scope.users.push(data);
            $scope.isActive = false;
            $scope.username = '';
        });
    };
    
      $scope.deleteUser = function (id, $event) {
        $event.preventDefault();
        console.log("DELETE " + id);
    };
    
    
});


