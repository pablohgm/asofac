angular
.module('app')
.factory('TipoService', function($http) {
    var service = {};

    service.getAll = function(success, error){
        $http.get('/api/tipos').then(success, error);
    };

    service.save = function(tipo, success, error){
        $http.post('/api/tipos', tipo).then(success, error);
    };

    service.edit = function(tipo, success, error){
        $http.put('/api/tipos/'+tipo.id, tipo).then(success, error);
    };

    service.delete = function(id, success, error){
        $http.delete('/api/tipos/'+id).then(success, error);
    };

    return service;
});