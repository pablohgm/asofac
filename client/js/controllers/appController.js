angular
  .module('app')
  .controller('AppController', ['$scope', '$state', 'Contribuyentes',
	  function($scope, $state, Contribuyentes) {

  	$scope.contribuyentes = [];

    function init() {
        Contribuyentes.find()
        .$promise
        .then(function(results) {
            $scope.contribuyentes = results;
        });
    };

    $scope.report = function() {
        console.log('A ...');
      Contribuyentes.createReport()
          .$promise
          .then(function(response) {
              console.log('B ...');
              var file = new Blob([response], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              console.log('C ...'+fileURL);
              window.open(fileURL);
          });
    };

  	init();

  }]);
