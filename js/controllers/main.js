controllers.controller('MainController', ['$location', 'omdb', function MainControllerFactory($location, omdb) {

    var main = this;

    var HISTORY_LENGTH = 5;

    main.history = [];
    main.errorMsg = '';

    main.getByTitle = function(title) {
        main.clearCurrentMovie();
        omdb.getByTitle(title).success(function(data, status) {
            if (data.Response === 'False') {
                main.errorMsg = data.Error;
            } else {
                main.errorMsg = null;
                main.movie = data;
            }
        });
    };

    main.searchByTitle = function(title) {
        main.clearCurrentMovie();
        omdb.searchByTitle(title).success(function(data, status) {
            if (data.Response === 'False') {
                main.errorMsg = data.Error;
            } else {
                main.errorMsg = null;
                main.movie = data;
            }
        });
    };

    main.clearCurrentMovie = function() {
        if (main.movie) {
            main.logToHistory(main.movie);
            main.movie = null;
        }
    };

    main.logToHistory = function(movie) {
        if (movie) {
            main.history.unshift(movie);
        }

        if (main.history.length > HISTORY_LENGTH) {
            main.history.length = HISTORY_LENGTH;
        }
    };

    main.loadFromHistory = function(movie) {
        if (movie) {
            main.clearCurrentMovie();
            main.movie = movie;
        }
    };


}]);
