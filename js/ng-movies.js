var filters = angular.module('ngmovies.filters', []);
var services = angular.module('ngmovies.services', ['ngmovies.filters']);
var directives = angular.module('ngmovies.directives', ['ngmovies.services', 'ngmovies.filters']);
var controllers = angular.module('ngmovies.controllers', ['ngmovies.services', 'ngmovies.directives', 'ngmovies.filters']);

var ngmovies = angular.module('ngmovies', ['ngAnimate', 'ngRoute', 'ngTouch', 'ngmovies.filters', 
        'ngmovies.services', 'ngmovies.directives', 'ngmovies.controllers']);

ngmovies.config(['$compileProvider', '$controllerProvider','$filterProvider', '$locationProvider', 
        '$logProvider', '$provide', '$routeProvider',
        function($compileProvider, $controllerProvider, $filterProvider, $locationProvider, 
            $logProvider, $provide, $routeProvider) {

    // Available for scripts loaded after the application has been bootstrapped
    ngmovies.compileProvider = $compileProvider;
    ngmovies.controllerProvider = $controllerProvider;
    ngmovies.filterProvider = $filterProvider;
    ngmovies.provide = $provide;
    ngmovies.routeProvider = $routeProvider;

    $logProvider.debugEnabled(false);
    $locationProvider.html5Mode(false);

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController as main',
    });

    $routeProvider.otherwise({redirectTo: '/'});

}]);

