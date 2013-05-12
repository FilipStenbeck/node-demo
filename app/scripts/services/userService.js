'use strict';

angular.module('frontendAngularApp').factory('userService', function ($http) {
    // var ROOT_URL = 'http://localhost:3000/';
    var ROOT_URL = 'http://node-demo.nodejitsu.com/';
   
    return {
        getOneUser : function (id, callback) {
            var url = ROOT_URL + "users/" + id;
            $http.get(url).success(function (data) {
                callback(data);
            });
        },
        getUsers : function (onlyActive, callback) {
            var url = ROOT_URL + "users";
            
            if (onlyActive) {
                url = url + "/active";
            }
            $http.get(url).success(function (data) {
                callback(data);
            });
        },
        newUser : function (user, callback) {
            var url = ROOT_URL + "users";
            $http.post(url, user).success(function (data) {
                callback(data);
            });
        },
        saveUser : function (user, callback) {
            var url = ROOT_URL + "users/" + user.id;
            $http.put(url, user).success(function (data) {
                callback(data);
            });
        },
        deleteUser : function (id, callback) {
            var url = ROOT_URL + "users/" + id;
            $http.delete(url).success(function (data) {
                callback(data);
            });
        }
    };
});
