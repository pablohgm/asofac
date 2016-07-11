angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location',  'Contribuyentes',
	  function($scope, $state, $window, $location, Contribuyentes) {

  	$scope.contribuyentes = [];

    $scope.pdf = {
      name: "anywhere.pdf",
      src: "http://localhost:8888/web/viewer.html?file=%2Fexamples%2Fhelloworld%2F"
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
        //$state.go('viewPdf');
        console.log($scope.pdf.src + $scope.pdf.name);
        $window.open($scope.pdf.src + $scope.pdf.name);
        //$window.open( "http://mozilla.github.io/pdf.js/web/viewer.html" );
    };

  	init();

  }]);
