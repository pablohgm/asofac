angular
  .module('app')
  .controller('ContribuyenteController', ['$scope', '$state', '$window', '$location',
              '$mdSidenav', 'ContribuyenteService', 'SectorService', 'TipoService', 'AlertService',
	  function($scope, $state, $window, $location, $mdSidenav, ContribuyenteService, SectorService, TipoService, AlertService) {

    var self = this;
    this.selectAll = false;
  	this.contribuyentes = [];
    this.contribuyente = {};
    this.sectores = [];
    this.tipos = [];

    this.pdf = {
      name: "report.pdf",
      src: "http://0.0.0.0:3000/tmpReport/"
    };

    this.onToggleRight = function() {
        var tmpform = $scope.contribuyenteForm;
        tmpform.$setUntouched();
        this.contribuyente = {};
        $mdSidenav('right').toggle();
    };

    this.onClose = function() {
        $mdSidenav('right').close();
    };

    this.onEdit = function(item) {
        self.contribuyente = angular.copy(item);
        self.contribuyente.toEdit = true;
        $mdSidenav('right').toggle();
    };

    this.onSelect = function(argValue) {
        _.forEach(self.contribuyentes, function(item){
            item.selected = argValue;
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
            AlertService.simpleAlert({type: 'SUCCESS', message: 'El usuario se guardo correctamente'});
        }, function(error){
            console.log(error);
        });
    }

    this.save = function() {
        ContribuyenteService.save(this.contribuyente, function(result){
            result.data.sector = self.getSector(result.data.sector);
            self.contribuyentes.unshift(result.data);
            self.contribuyente = {};
            self.onClose();
            AlertService.simpleAlert({type: 'SUCCESS', message: 'El usuario se guardo correctamente'});
        }, function(error){
            console.log(error);
        });
    }


    this.onDelete = function() {
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
            AlertService.simpleAlert({type: 'SUCCESS', message: 'El usuario se elimino correctamente'});
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

    this.onReport = function() {
        var tmpData = {};
        tmpData.contribuyentes = _.filter(this.contribuyentes, function(item){
            return item.selected === true;
        });
        if(!tmpData.contribuyentes.length){
            AlertService.simpleAlert({type: 'WARNING', message: 'No hay contribuyentes seleccionados'});
            return;
        }
        ContribuyenteService.createReport(tmpData, function(response) {
            var file = new Blob([response.data], {type: 'text/html'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        }, function(e){
            console.log(e);
        });
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
