angular
.module('app')
.factory('ContribuyenteService', function($http) {
    var service = {};

    service.getAll = function(success, error){
        $http.get('/api/contribuyentes').then(success, error);
    };

    service.save = function(contribuyente, success, error){
        contribuyente.sector = contribuyente.sector.id;
        $http.post('/api/contribuyentes', contribuyente).then(success, error);
    };

    service.edit = function(contribuyente, success, error){
        contribuyente.sector = contribuyente.sector.id;
        $http.put('/api/contribuyentes/'+contribuyente.id, contribuyente).then(success, error);
    };

    service.createReport = function(contribuyente, success, error){
        contribuyente.year = new Date().getFullYear();
        contribuyente.day = new Date().getDate();
        contribuyente.month = new Date().getMonth()+1;// FIX the javascript
        $http({
            method: 'POST',
            url: '/api/contribuyentes/report',
            data: contribuyente,
            responseType:'arraybuffer',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(success, error);
    };

    service.delete = function(id, success, error){
        $http.delete('/api/contribuyentes/'+id).then(success, error);
    };

    return service;
});