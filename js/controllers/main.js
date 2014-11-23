controllers.controller('MainController', ['$location', 'omdb', function MainControllerFactory($location, omdb) {

    var main = this;

    var HISTORY_LENGTH = 20;

    main.search = {type:'exactTitle'};
    main.searchResults = null;
    main.history = [];
    main.errorMsg = '';

    main.getMovies = function() {
        main.clearCurrentMovie();
        main.searchResults = null;
        switch (main.search.type) {
            case 'exactTitle':
                main.getByTitle(main.search.value);
                break;
            case 'titleSearch':
                main.searchByTitle(main.search.value);
                break;
            case 'imdbId':
                main.getById(main.search.value);
                break;
        };
    };


    main.getById = function(id) {
        main.clearCurrentMovie();
        main.errorMsg = null;
        main.searchResults = null;
        omdb.getById(id).success(function(data, status) {
            if (data.Response === 'False') {
                main.errorMsg = data.Error;
            } else {
                main.errorMsg = null;
                main.movie = data;
            }
        });
    };

    main.getByTitle = function(title) {
        main.clearCurrentMovie();
        main.errorMsg = null;
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
        main.errorMsg = null;
        omdb.searchByTitle(title).success(function(data, status) {
            if (data.Response === 'False') {
                main.errorMsg = data.Error;
            } else if (!data.Search || data.Search.length == 0) {
                main.errorMsg = 'No results for ' + title + '!';
            } else {
                main.errorMsg = null;
                main.searchResults = data.Search;
                $('#results').modal('show');
            }
        });
    };

    main.posterUrl = function(id) {
        if (!id) {
            return "";
        }
        return omdb.getPosterUrl(id);
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

    // Would really rather avoid doing stuff like this...
    // data-dismiss doesn't work after adding an ng-click
    main.dismissDialog = function(id) {
        $('#'+id).modal('hide');
    }
}]);

