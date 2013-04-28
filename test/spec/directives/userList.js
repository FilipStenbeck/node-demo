'use strict';

describe('Directive: userList', function () {
  beforeEach(module('frontendAngularApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<user-list></user-list>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the userList directive');
  }));
});
