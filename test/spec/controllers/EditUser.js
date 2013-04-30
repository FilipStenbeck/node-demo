'use strict';

describe('Controller: EditUserCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendAngularApp'));

  var EditUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditUserCtrl = $controller('EditUserCtrl', {
      $scope: scope
    });
  }));

  it('Not the best test', function () {
    expect(user).toBe(undefined);
  });
});
