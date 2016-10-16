angular
  .module('app')
  .controller('TipoController', ['$scope', '$state', '$window', '$location', '$sessionStorage',
	  function($scope, $state, $window, $location, $sessionStorage) {

    function init() {
        if (_.isEmpty($sessionStorage.token)){
            $location.url('/login');
            return;
        }
    };

  	init();

  }]);
