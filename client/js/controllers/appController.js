angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location', '$sessionStorage',
	  function($scope, $state, $window, $location, $sessionStorage) {

    function init() {
        if (_.isEmpty($sessionStorage.token)){
            $location.url('/login');
            return;
        }
        $state.go('main.contribuyente');
    };

  	init();

  }]);
