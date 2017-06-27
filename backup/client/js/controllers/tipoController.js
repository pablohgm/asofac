angular
  .module('app')
  .controller('TipoController', ['$scope', '$state', '$window', '$location', '$sessionStorage','$mdSidenav', 'TipoService',
	  function($scope, $state, $window, $location, $sessionStorage, $mdSidenav, TipoService) {

    var self = this;
    this.tipos = [];
    this.tipo = {};
    
    this.onToggleRight = function() {
      var tmpform = $scope.tipoForm;
      tmpform.$setUntouched();
      this.tipo = {};
      $mdSidenav('right').toggle();
    };
    
    this.onClose = function() {
      $mdSidenav('right').close();
    };
    
    this.onEdit = function(item) {
      self.tipo = angular.copy(item);
      self.tipo.toEdit = true;
      $mdSidenav('right').toggle();
    };
    
    this.onSelect = function(argValue) {
      _.forEach(self.tipos, function(item){
          item.selected = argValue;
      });
    };
    
    this.onSave = function() {
      if(this.tipo.toEdit){
          this.edit();
          return;
      }
      this.save();
    };
    
    this.edit = function() {
      TipoService.edit(this.tipo, function(result){
          var tmpIndex = _.findIndex(self.tipos, function(item){
              return item.id === result.data.id;
          });
          self.tipos[tmpIndex] = result.data;
          self.tipo = {};
          self.onClose();
      }, function(error){
          console.log(error);
      });
    };
    
    this.save = function() {
      TipoService.save(this.tipo, function(result){
          self.tipos.unshift(result.data);
          self.tipo = {};
          self.onClose();
      }, function(error){
          console.log(error);
      });
    };
    
    this.onDelete = function() {
      _.forEach(this.tipos, function(item){
          if(item.selected === true){
              self.delete(item.id);
          }
      });
    };
    
    this.delete = function (argId){
      TipoService.delete(argId, function(){
          _.remove(self.tipos, function(item){
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
      TipoService.getAll(function(results) {
          self.tipos = results.data;
      }, function(error){
          console.log();
      });
    };

  	init();

  }]);
