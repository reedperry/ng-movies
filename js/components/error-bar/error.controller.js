(function(angular) {

angular.module('app.components')
  .controller('ErrorController', ErrorController);

function ErrorController() {
  console.log('Starting ErrorController');
}

})(window.angular);
