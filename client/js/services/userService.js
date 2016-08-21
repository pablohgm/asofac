angular
.module('app')
.factory('UserService', function($http) {
    var service = {};

    service.login = function(user, success, error){
        $http.post('/api/Users/login', user).then(success, error);
    };

    return service;
});