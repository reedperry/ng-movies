(function(angular) {
  'use strict';

angular.module('app.components', []);

angular.module('app.module', [
  'ngAnimate',
  'ngRoute',
  'ngTouch',
  'app.components'
])
.config(['$compileProvider', '$controllerProvider','$filterProvider', '$locationProvider',
        '$logProvider', '$provide',
        function($compileProvider, $controllerProvider, $filterProvider, $locationProvider,
            $logProvider, $provide) {

    $logProvider.debugEnabled(false);
    $locationProvider.html5Mode(false);
}]);

})(window.angular);
