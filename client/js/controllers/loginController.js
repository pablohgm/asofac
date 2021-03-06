angular
.module('app')
.controller('LoginController', ['$scope', '$state', '$window', '$location','$sessionStorage', 'UserService', 'AlertService',
    function($scope, $state, $window, $location, $sessionStorage, UserService, AlertService) {

        this.user = {username: '', password: ''};

        function init() {
            console.log('Init Login');
        };

        this.submit = function(){
            UserService.login(this.user, successLogin, errorLogin);

        };

        function successLogin (result) {
            $sessionStorage.token = result.data.id;
            $location.url('/');
        }

        function errorLogin (error) {
            AlertService.simpleAlert({type: 'ERROR', message: error.statusText});
        }

        init();

    }]);
