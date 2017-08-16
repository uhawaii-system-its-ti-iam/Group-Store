(function() {
  function StoreController($scope, dataProvider, FILTER_OPTIONS, CartService) {

    $scope.pathHistory;
    $scope.home;

    $scope.currentLocationName;
    $scope.itemsInCurrentLocation;
    $scope.availableFilters;

    /**
     * Initialization of Group Store UI. Moves the user to the home directory.
     */
    $scope.init = function() {
      $scope.pathHistory = [];
      var url = encodeURI('/store/api/stems/name/hawaii.edu:store/');
      dataProvider.loadData(function(d) {
        console.log(d);
        $scope.home = d.data[0];
        $scope.home.type = 'stem';
        $scope.goToPath($scope.home);
      }, url);
      $scope.availableFilters = FILTER_OPTIONS;
    };

    /**
     * Moves the user to the new path specified when clicking on an item in the store. If the user clicks on a group
     * instead, it will add the group to the cart.
     * @param {object} location - the location to move to
     */
    $scope.goToPath = function(path) {
      if (path.type === 'stem') {
        $scope.pathHistory.push(path);
        $scope.updatePanelText();
        $scope.loadItemsInCurrentLocation();
      } else if (path.type === 'group') {
        CartService.addToCart(path);
      }
    };

    /**
     * Moves the user back to the previous folder.
     */
    $scope.moveBackOnePath = function() {
      $scope.pathHistory.pop();
      $scope.updatePanelText();
      $scope.loadItemsInCurrentLocation();
    };

    /**
     * Moves the user to the path clicked on the breadcrumb header.
     * @param {number} index - the index of the breadcrumb clicked on by the user
     */
    $scope.moveToBreadcrumbIndex = function(index) {
      $scope.pathHistory = $scope.pathHistory.slice(0, index + 1);
      $scope.updatePanelText();
      $scope.loadItemsInCurrentLocation();
    };

    /**
     * Loads the stems/folders and groups in the user's current location.
     */
    $scope.loadItemsInCurrentLocation = function() {
      $scope.itemsInCurrentLocation = [];
      var currentLocation = $scope.pathHistory[$scope.pathHistory.length - 1].name;
      var stemsUrl = encodeURI('/store/api/stems/children/' + currentLocation + '/')
      // Load stems/folders
      dataProvider.loadData(function(d) {
        var data = d.data;
        data.forEach(function (item) {
          item.type = 'stem';
          $scope.itemsInCurrentLocation.push(item);
        });
      }, stemsUrl);
      // Load groups
      var groupsUrl = encodeURI('/store/api/groups/path/' + currentLocation + '/');
      dataProvider.loadData(function(d) {
        var data = d.data;
        data.forEach(function(item) {
          item.type = 'group';
          $scope.itemsInCurrentLocation.push(item);
        });
      }, groupsUrl);
    };

    /**
     * Checks if the user is at the home directory (hawaii.edu:store).
     * @returns {boolean} true if the user is at the home directory, otherwise returns false
     */
    $scope.isUserAtHome = function() {
      return ($scope.pathHistory.length === 1) &&
          ($scope.pathHistory[$scope.pathHistory.length - 1].name === 'hawaii.edu:store');
    };

    /**
     * Updates the panel title text that tell the user which folder they're in.
     */
    $scope.updatePanelText = function() {
      $scope.currentLocationName = $scope.pathHistory[$scope.pathHistory.length - 1].extension;
    };

    /**
     * Removes the specified group from the cart.
     * @param {object} group - the group to remove
     */
    $scope.removeFromCart = function(group) {
      CartService.removeFromCart(group);
    };

    /**
     * @returns {number} the number of groups in the user's cart
     */
    $scope.getAmountInCart = function() {
      return CartService.getAmountInCart();
    };

    /**
     * @returns {object[]} an array of groups in the user's cart
     */
    $scope.getGroupsInCart = function() {
      return CartService.getGroupsInCart();
    };

  }
  storeApp.controller('StoreControllerV2', StoreController);

})();
