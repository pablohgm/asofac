angular
    .module('app')
    .factory('AlertService', function($mdToast) {
        var service = {};

        service.errorLogin = function(error){
            $mdToast.show({
                hideDelay   : 3000,
                parent      : 'html',
                position    : 'top right',
                controller  : 'ToastController',
                templateUrl : '/views/toast-error.html',
                locals: {
                    data: error
                }
            });
        };

        return service;
    });