angular
  .module('app')
  .controller('SectorController', ['$scope', '$state', '$window', '$location', '$sessionStorage', '$mdSidenav', 'SectorService',
	  function($scope, $state, $window, $location, $sessionStorage, $mdSidenav, SectorService) {

    var self = this;
    this.sectores = [];
    this.sector = {}; 

    this.onToggleRight = function() {
      var tmpform = $scope.sectorForm;
      tmpform.$setUntouched();
      this.sector = {};
      $mdSidenav('right').toggle();
    };

    this.onClose = function() {
      $mdSidenav('right').close();
    };

    this.onEdit = function(item) {
      self.sector = angular.copy(item);
      self.sector.toEdit = true;
      $mdSidenav('right').toggle();
    };

    this.onSelect = function(argValue) {
      _.forEach(self.sectores, function(item){
          item.selected = argValue;
      });
    };

    this.onSave = function() {
      if(this.sector.toEdit){
          this.edit();
          return;
      }
      this.save();
    };

    this.edit = function() {
      SectorService.edit(this.sector, function(result){
          var tmpIndex = _.findIndex(self.sectores, function(item){
              return item.id === result.data.id;
          });
          self.sectores[tmpIndex] = result.data;
          self.sector = {};
          self.onClose();
      }, function(error){
          console.log(error);
      });
    };

    this.save = function() {
        SectorService.save(this.sector, function(result){
          self.sectores.unshift(result.data);
          self.sector = {};
          self.onClose();
      }, function(error){
          console.log(error);
      });
    };

    this.onDelete = function() {
      _.forEach(this.sectores, function(item){
          if(item.selected === true){
              self.delete(item.id);
          }
      });
    };

    this.delete = function (argId){
      SectorService.delete(argId, function(){
          _.remove(self.sectores, function(item){
              return item.id == argId;
          });
      }, function(error){
          console.log(error);
      });
    };

    function init() {
        if (_.isEmpty($sessionStorage.token)){
            $location.url('/login');
            return;
        }
        SectorService.getAll(function(results) {
          self.sectores = results.data;
        }, function(error){
          console.log();
        });
    };

  	init();

  }]);
