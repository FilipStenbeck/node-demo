'use strict';

describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('frontendAngularApp'));

  // instantiate service
  var userService;
  beforeEach(inject(function (_userService_) {
    userService = _userService_;
  }));

  it('should do something', function () {
    expect(nothing).toBe(undefined);
  });

});
