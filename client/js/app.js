angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/main.html',
        controller: 'AppController'
      });

    $urlRouterProvider.otherwise('todo');
  }]);
