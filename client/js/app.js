angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: '../views/main.html',
        controller: 'AppController'
      })
    .state('viewPdf', {
        url: '/viewPdf',
        templateUrl: '../views/viewPdf.html',
        controller: 'ViewPdfController'
    })
    ;

    $urlRouterProvider.otherwise('todo');
  }]);
