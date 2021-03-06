'use strict';

angular.module('frontendAngularApp').controller('MainCtrl', function ($scope,  $location, userService) {
    $scope.activeOnly = false;

    $scope.load = function () {
        userService.getUsers($scope.activeOnly, function (data) {
            $scope.users  = data;
        });
    };

    $scope.newUser = function () {
        if ($scope.isActive === undefined) {
            $scope.isActive = false;
        }
        var user = {
            name :  $scope.username,
            isActive : $scope.isActive
        };
        userService.newUser(user, function (data) {
            $scope.load();
            $scope.isActive = false;
            $scope.username = '';
        });
    };

    $scope.editUser = function (id, $event) {
        $event.preventDefault();
        $location.url('/edit/' + id);
    };

    $scope.deleteUser = function (id, $event) {
        $event.preventDefault();
        userService.deleteUser(id, function (data) {
            $scope.users  = data;
        });
    };

  //load users on startup
  $scope.load();
});
