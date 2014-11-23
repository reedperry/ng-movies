services.factory('omdb', ['$http', '$log', function($http, $log) {

    var BASE_URL = 'http://omdbapi.com/';
    var POSTER_URL = 'http://img.omdbapi.com/?apikey=20e8506b';

    function getIdFetchUrl(id) {
        return BASE_URL + '?i='+id
    }

    function getTitleFetchUrl(title) {
        return BASE_URL + '?t='+title
    }

    function getTitleSearchUrl(title) {
        return BASE_URL + '?s='+title
    }

    function getPosterUrl(id) {
        return POSTER_URL + '&i='+id
    }

    var omdb = {

        getById: function(id) {
            if (!id) {
                $log.log('Must provide an ID to fetch.');
            }
            var url = getIdFetchUrl(id);

            return $http.get(url).
                success(function(data, status) {
                    $log.log('Got movie by ID: %O', data);
                }).
                error(function(data, status) {
                    $log.log('Error getting movie data. Status: ' + status);
                });
        },

        getByTitle: function(title) {
            if (!title) {
                $log.log('Must provide a title to fetch.');
            }
            var url = getTitleFetchUrl(title);

            return $http.get(url).
                success(function(data, status) {
                    $log.log('Got movie data: %O', data);
                }).
                error(function(data, status) {
                    $log.log('Error getting movie data. Status: ' + status);
                });
        },

        searchByTitle: function(title) {
            if (!title) {
                $log.log('Must provide a title to search for.');
            }
            var url = getTitleSearchUrl(title);

            return $http.get(url).
                success(function(data, status) {
                    $log.log('Got search results: %O', data);
                }).
                error(function(data, status) {
                    $log.log('Error getting movie data. Status: ' + status);
                });
        },

        getPosterUrl: getPosterUrl,

        getPoster: function(id) {
            if (!id) {
                $log.log('Must provide an id to get poster.');
            }
            var url = getPosterUrl(id);

            return $http.get(url).
                success(function(data, status) {
                    $log.log('Got poster for id: %s', id);
                }).
                error(function(data, status) {
                    $log.log('Error getting poster for id %s. Status: %s', id, status);
                });
        }

    };

    return omdb;
}]);

