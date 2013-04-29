'use strict';

angular.module('frontendAngularApp')
  .factory('userService', function ($http) {
    var ROOT_URL = 'http://localhost:3000/';
   
    return {
        getUsers : function (onlyActive, callback) {
            
            var url = ROOT_URL + "users";
            
            if (onlyActive) {
                url = url + "/active";
            }
            
            $http.get(url).success(function (data) { 
                callback(data);
    	   });      
        }
    };
});
