angular
    .module('app')
    .factory('UserService', function($http) {
        var service = {};

    service.login = function(user, success, error){
        try {
            $http.post('/api/Users/login', user).then(success, error);
        } catch (e) {
            error(e);
        }
    };

        return service;
    });