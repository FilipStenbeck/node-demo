'use strict';

angular.module('frontendAngularApp').controller('EditUserCtrl', function ($scope,  $routeParams,  $location, userService) {
    var user;
    $scope.id = $routeParams.id;
    user = userService.getOneUser($scope.id, function (data) {
        $scope.name = data.name;
        $scope.isActive = data.isActive;
        $scope.message = data.message;
    });

    $scope.onSave = function () {
        var user = {
            id : $scope.id,
            name :  $scope.name,
            isActive : $scope.isActive
        };
        userService.saveUser(user, function (data) {
            $location.url("/");
        });
    };

    $scope.onClose = function () {
        $location.url("/");
    };
});
