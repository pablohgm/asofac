angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location', '$mdSidenav', 'ContribuyenteService',
	  function($scope, $state, $window, $location, $mdSidenav, ContribuyenteService) {

    var self = this;
  	this.contribuyentes = [];
    this.contribuyente = {};


    this.pdf = {
      name: "report.pdf",
      src: "http://0.0.0.0:3000/tmpReport/"
    };

    $scope.toggleRight = function() {
        $mdSidenav('right').toggle();
    };

    $scope.close = function() {
        $mdSidenav('right').close();
    };

    $scope.save = function() {
        ContribuyenteService.save(this.contribuyente, function(result){
            self.contribuyentes.add(result.data);
        }, function(error){
            console.log(error);
        });
    };


    this.delete = function(argItems) {
        var tmpContribuyentes = this.contribuyentes;
        _.forEach(argItems, function(itemId){
            ContribuyenteService.delete(itemId, function(result){
                _.remove(tmpContribuyentes, function(item){
                    return item.id == itemId;
                });
            }, function(error){
                console.log(error);
            });
        });
    };

    function init() {
        ContribuyenteService.getAll(function(results) {
            self.contribuyentes = results.data;
        }, function(error){
            console.log();
        });
    };

    $scope.report = function() {
      //Contribuyentes.createReport()
      //    .$promise
      //    .then(function(response) {
      //        console.log('B ...');
      //        var file = new Blob([response], {type: 'application/pdf'});
      //        var fileURL = URL.createObjectURL(file);
      //        console.log('C ...'+fileURL);
      //        window.open(fileURL, '_blank');
      //    });
    };

    $scope.toViewPdf = function() {
        $window.open($scope.pdf.src + $scope.pdf.name);
    };

  	init();

  }]);
