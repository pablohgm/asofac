angular
  .module('app', [
    'ui.router',
    'ngStorage',
    'ngMaterial'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../views/main.html',
        controller: 'AppController'
      })
    .state('viewPdf', {
        url: '/viewPdf',
        templateUrl: '../views/viewPdf.html',
        controller: 'ViewPdfController'
    })
    .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'LoginController'
    })
    ;

    $urlRouterProvider.otherwise('main');
  }]);
