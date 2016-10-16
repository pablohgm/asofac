angular
  .module('app', [
    'ui.router',
    'ngStorage',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
      function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '../views/login.html',
            controller: 'LoginController as login'
        })
        .state('main', {
            url: '/main',
            templateUrl: '../views/main.html',
            controller: 'AppController as app'
        })
        //.state('viewPdf', {
        //    url: '/viewPdf',
        //    templateUrl: '../views/viewPdf.html',
        //    controller: 'ViewPdfController'
        //})
        .state('main.sector', {
            url: '/sector',
            templateUrl: '../views/sector.html',
            controller: 'SectorController as sector'
        })
        .state('main.contribuyente', {
            url: '/contribuyente',
            templateUrl: '../views/contribuyente.html',
            controller: 'ContribuyenteController as contribuyente'
        })
        .state('main.tipo', {
            url: '/tipo',
            templateUrl: '../views/tipo.html',
            controller: 'TipoController as tipo'
        });

        $mdThemingProvider.theme('default')
          .accentPalette('orange');

        $urlRouterProvider.otherwise('main');

  }]);
