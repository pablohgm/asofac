angular
  .module('app', [
    'ui.router',
    'ngStorage',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',
    'angular-loading-bar',
    'ngAnimate'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'cfpLoadingBarProvider',
      function($stateProvider, $urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;

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
        })
        .state('main.configuracion', {
          url: '/configuracion',
          templateUrl: '../views/configuracion.html',
          controller: 'ConfiguracionController as configuracion'
        });

        $mdThemingProvider.theme('default')
          .accentPalette('orange');

        $urlRouterProvider.otherwise('main');

  }]);
