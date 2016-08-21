angular
.module('app')
.controller('LoginController', ['$scope', '$state', '$window', '$location','$sessionStorage', 'UserService',
    function($scope, $state, $window, $location, $sessionStorage, UserService) {

        this.user = {username: '', password: ''};

        function init() {
            console.log('Init Login');
        };

        $scope.submit = function(){
            UserService.login(this.user, successLogin, errorLogin);

        };

        function successLogin (user) {
            $sessionStorage.token = user.id
            $location.url('/');
        }

        function errorLogin () {
        }

        init();

    }]);
