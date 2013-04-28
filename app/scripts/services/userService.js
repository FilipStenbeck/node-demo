'use strict';

angular.module('frontendAngularApp')
  .factory('userService', function ($http) {
    var ROOT_URL = 'http://localhost:3000/';
   
    return {
        getUsers : function (onlyActive, callback) {
            $http.get(ROOT_URL + "users").success(function (data) { 
                callback(data);
    	   });      
        }
    };
});
