'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendAngularApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be set to show all users', function () {
    expect($scope.activeOnly).toBe(false);
  });
});
