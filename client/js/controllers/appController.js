angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location', '$mdSidenav', 'ContribuyenteService',
	  function($scope, $state, $window, $location, $mdSidenav, ContribuyenteService) {

    var self = this;
  	this.contribuyentes = [];
    this.selectedList = [];
    this.contribuyente = {};

    this.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

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

    $scope.delete = function() {
        var test = this.selectedList;
        _.forEach(self.selectedList, function(item){
            if(item.selected){
                //ContribuyenteService.delete(item, function(result){
                //    debugger;
                //    self.contribuyentes.remove(result.data);
                //}, function(error){
                //    console.log(error);
                //});
            }
        });
    };

    $scope.getContribuyentes = function(){
        this.promise = ContribuyenteService.getAll(function(results) {
            self.contribuyentes = results.data;
        }, function(error){
            console.log();
        }).$promise;
    };

    this.onSelect = function(argItemSelected){
        console.log('test');
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
