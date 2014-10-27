services.factory('omdb', ['$http', '$log', function($http, $log) {

    var BASE_URL = 'http://omdbapi.com/';

    function getTitleSearchUrl(title) {
        return BASE_URL + '?t='+title
    }

    var omdb = {

        getByTitle: function(title) {
            if (!title) {
                $log.log('Must provide a title to search for.');
            }
            var url = getTitleSearchUrl(title);

            return $http.get(url).
                success(function(data, status) {
                    $log.log('Got movie data: %O', data);
                }).
                error(function(data, status) {
                    $log.log('Error getting movie data. Status: ' + status);
                });
        }

    };

    return omdb;
}]);
