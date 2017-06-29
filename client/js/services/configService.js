angular
.module('app')
.factory('ConfigService', function($http) {
    var service = {};

    service.getAll = function(success, error){
        $http.get('/api/configurations').then(success, error);
    };

    service.save = function(config, success, error){
        $http.post('/api/configurations', config).then(success, error);
    };

    service.edit = function(config, success, error){
        $http.put('/api/configurations/'+config.id, config).then(success, error);
    };

    service.delete = function(id, success, error){
        $http.delete('/api/configurations/'+id).then(success, error);
    };

    return service;
});
