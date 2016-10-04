angular
.module('app')
.factory('ContribuyenteService', function($http) {
    var service = {};

    service.getAll = function(success, error){
        $http.get('/api/contribuyentes').then(success, error);
    };

    service.save = function(contribuyente, success, error){
        $http.post('/api/contribuyentes', contribuyente).then(success, error);
    };

    return service;
});