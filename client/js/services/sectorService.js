angular
.module('app')
.factory('SectorService', function($http) {
    var service = {};

    service.getAll = function(success, error){
        $http.get('/api/sectors').then(success, error);
    };

    service.save = function(sector, success, error){
        $http.post('/api/sectors', sector).then(success, error);
    };

    service.edit = function(sector, success, error){
        $http.put('/api/sectors/'+sector.id, sector).then(success, error);
    };

    service.delete = function(id, success, error){
        $http.delete('/api/sectors/'+id).then(success, error);
    };

    return service;
});