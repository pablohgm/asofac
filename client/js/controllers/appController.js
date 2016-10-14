angular
  .module('app')
  .controller('AppController', ['$scope', '$state', '$window', '$location',
              '$mdSidenav', 'ContribuyenteService', 'SectorService', 'TipoService',
	  function($scope, $state, $window, $location, $mdSidenav, ContribuyenteService, SectorService, TipoService) {

    var self = this;
  	this.contribuyentes = [];
    this.contribuyente = {};
    this.sectores = [];
    this.tipos = [];

    this.pdf = {
      name: "report.pdf",
      src: "http://0.0.0.0:3000/tmpReport/"
    };

    this.onToggleRight = function() {
        $mdSidenav('right').toggle();
    };

    this.onClose = function() {
        $mdSidenav('right').close();
    };

    this.onEdit = function() {
        _.forEach(self.contribuyentes, function(item){
            if(item.selected){
                self.contribuyente = angular.copy(item);
                self.contribuyente.toEdit = true;
                $mdSidenav('right').toggle();
                return;
            }
        });
    };

    this.onSelect = function(argItem) {
        _.forEach(self.contribuyentes, function(item){
            if(item.id !== argItem.id){
                item.selected = false;
            }
        });
    };

    this.onSave = function() {
        if(this.contribuyente.toEdit){
            this.edit();
            return;
        }
        this.save();
    };

    this.edit = function() {
        ContribuyenteService.edit(this.contribuyente, function(result){
            var tmpIndex = _.findIndex(self.contribuyentes, function(item){
                return item.id === result.data.id;
            });
            result.data.sector = self.getSector(result.data.sector);
            self.contribuyentes[tmpIndex] = result.data;
            self.contribuyente = {};
            self.onClose();
        }, function(error){
            console.log(error);
        });
    }

    this.save = function() {
        ContribuyenteService.save(this.contribuyente, function(result){
            self.contribuyentes.unshift(result.data);
            self.contribuyente = {};
            self.onClose();
        }, function(error){
            console.log(error);
        });
    }


    this.onDelete = function() {
        if(!this.contribuyente.id){
            return;
        }
        _.forEach(this.contribuyentes, function(item){
            if(item.selected === true){
                self.delete(item.id);
            }
        });
    };

    this.delete = function (argId){
        ContribuyenteService.delete(argId, function(){
            _.remove(self.contribuyentes, function(item){
                return item.id == argId;
            });
            self.contribuyente = {};
        }, function(error){
            console.log(error);
        });
    }

    function init() {
        ContribuyenteService.getAll(function(results) {
            self.contribuyentes = results.data;
            SectorService.getAll(function(results) {
                self.sectores = results.data;
                self.setSector();
            }, function(error){
                console.log();
            })
        }, function(error){
            console.log();
        });
        TipoService.getAll(function(results) {
            self.tipos = results.data;
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

    this.toViewPdf = function() {
        $window.open($scope.pdf.src + $scope.pdf.name);
    };

    this.getSector = function(argId){
        var tmpSector;
        tmpSector=  _.find(this.sectores, function(item){
            return item.id == argId;
        });
        return tmpSector;
    };

    this.setSector = function() {
        _.forEach(this.contribuyentes, function(item){
            item.sector = self.getSector(item.sector);
        });
    };

  	init();

  }]);
