angular
  .module('app')
  .controller('AppController', ['$scope', '$state', 'Contribuyentes',
	  function($scope, $state, Contribuyentes) {

  	$scope.contribuyentes = [];

    function init() {
        Contribuyentes.find()
        .$promise
        .then(function(results) {
            console.log('test ...');
            $scope.contribuyentes = results;
        });
    };

  	init();

  }]);
