angular
  .module('app')
  .controller('ConfiguracionController', ['$scope', '$state', '$window', '$location', '$sessionStorage','$mdSidenav', 'ConfigService',
	  function($scope, $state, $window, $location, $sessionStorage, $mdSidenav, ConfigService) {

    var self = this;
    this.config = {};
    this.tmpConfig = {};

    this.onClose = function() {
      $mdSidenav('right').close();
    };
    
    this.onEdit = function() {
        self.tmpConfig = angular.copy(self.config);
        $mdSidenav('right').toggle();
    };

    this.onSave = function() {
        ConfigService.edit(this.tmpConfig, function(result){
            self.config = result.data;
            self.onClose();
        }, function(error){
            console.log(error);
        });
    };
    
    function init() {
      if (_.isEmpty($sessionStorage.token)){
          $location.url('/login');
          return;
      }
      ConfigService.getAll(function(results) {
          self.config = results.data[0];
      }, function(error){
          console.log();
      });
    };

  	init();

  }]);
