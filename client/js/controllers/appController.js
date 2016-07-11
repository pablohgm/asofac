angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location',  'Contribuyentes',
	  function($scope, $state, $window, $location, Contribuyentes) {

  	$scope.contribuyentes = [];

    $scope.pdf = {
      name: "report.pdf",
      src: "http://0.0.0.0:3000/tmpReport/"
    };

    function init() {
        Contribuyentes.find()
        .$promise
        .then(function(results) {
            $scope.contribuyentes = results;
        });
    };

    $scope.report = function() {
      Contribuyentes.createReport()
          .$promise
          .then(function(response) {
              console.log('B ...');
              var file = new Blob([response], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              console.log('C ...'+fileURL);
              window.open(fileURL, '_blank');
          });
    };

    $scope.toViewPdf = function() {
        $window.open($scope.pdf.src + $scope.pdf.name);
    };

  	init();

  }]);
