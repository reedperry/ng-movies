controllers.controller('AppController', ['$location', App]);

function App($location) {
    var app = this;
    app.$location = $location;

    this.goHome = function() {
        this.$location.path('/');
    }
}

