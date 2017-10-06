(function() {
  storeApp.factory('dataProvider', ['$http', function($http) {
    return {
      loadData: function(callback, url) {
        return $http.get(encodeURI(url))
            .then(callback, function(response) {
              console.log('Error in dataProvider; response: ', response);
            });
      },
    }
  }]);

})();
