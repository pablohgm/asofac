angular
    .module('app')
    .factory('AlertService', function($mdToast) {
        var service = {};

        service.simpleAlert = function(data){
            switch (data.type) {
                case "SUCCESS":
                    data.toastClass = "toast-success";
                    break;
                case "ERROR":
                    data.toastClass = "toast-error";
                    break;
                case "INFO":
                    data.toastClass = "toast-info";
                    break;
                case "WARNING":
                    data.toastClass = "toast-warning";
                    break;
            };

            $mdToast.show({
                hideDelay   : 3000,
                parent      : 'html',
                position    : 'top right',
                controller  : 'ToastController',
                templateUrl : '/views/toast-template.html',
                locals: {
                    data: data
                }
            });
        };

        return service;
    });