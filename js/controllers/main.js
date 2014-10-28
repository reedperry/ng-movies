controllers.controller('MainController', ['$location', 'omdb', function MainControllerFactory($location, omdb) {

    var main = this;

    var HISTORY_LENGTH = 5;

    main.searchResults = null;
    main.history = [];
    main.errorMsg = '';

    main.getByTitle = function(title) {
        main.clearCurrentMovie();
        main.searchResults = null;
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
                main.searchResults = data.Search;
            }
        });
    };

    main.clearCurrentMovie = function() {
        if (main.movie) {
            if (main.history.filter(function(m) {return m.imdbID === main.movie.imdbID}).length === 0) {
                main.logToHistory(main.movie);
            }
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
