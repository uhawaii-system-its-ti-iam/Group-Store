(function() {
  function StoreController($scope, dataProvider, FILTER_OPTIONS, CartService) {

    $scope.pathHistory;
    $scope.home;

    $scope.currentLocationName;
    $scope.itemsInCurrentLocation;
    $scope.availableFilters;

    $scope.filtersSelected;
    $scope.isSearching;

    /**
     * Initialization of Group Store UI. Moves the user to the home directory.
     */
    $scope.init = function() {
      $scope.pathHistory = [];
      $scope.filtersSelected = [];
      $scope.isSearching = false;
      // Move the user to the home directory
      var url = encodeURI('/store/api/stems/name/hawaii.edu:store/');
      dataProvider.loadData(function(d) {
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
    $scope.goToPath = function(item) {
      $scope.isSearching = false;
      if (item.type === 'stem') {
        $scope.pathHistory.push(item);
        $scope.updatePanelText();
        $scope.itemsInCurrentLocation = [];
        $scope.loadItemsInLocation(item.name);
      } else if (item.type === 'group') {
        CartService.addToCart(item);
      }
    };

    /**
     * Moves the user back to the previous folder.
     */
    $scope.moveBackOnePath = function() {
      $scope.pathHistory.pop();
      $scope.updatePanelText();
      $scope.itemsInCurrentLocation = [];
      $scope.loadItemsInLocation($scope.pathHistory[$scope.pathHistory.length - 1].name);
    };

    /**
     * Moves the user to the path clicked on the breadcrumb header.
     * @param {number} index - the index of the breadcrumb clicked on by the user
     */
    $scope.moveToBreadcrumbIndex = function(index) {
      $scope.pathHistory = $scope.pathHistory.slice(0, index + 1);
      $scope.updatePanelText();
      $scope.itemsInCurrentLocation = [];
      $scope.loadItemsInLocation($scope.pathHistory[$scope.pathHistory.length - 1].name);
    };

    /**
     * Loads the stems/folders and groups in the user's current location.
     * @param {string} path - the path to load the items
     */
    $scope.loadItemsInLocation = function(path) {
      var stemsUrl = encodeURI('/store/api/stems/children/' + path + '/')
      // Load stems/folders
      dataProvider.loadData(function(d) {
        var data = d.data;
        data.forEach(function (item) {
          item.type = 'stem';
          $scope.itemsInCurrentLocation.push(item);
        });
      }, stemsUrl);
      // Load groups
      var groupsUrl = encodeURI('/store/api/groups/path/' + path + '/');
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

    /**
     * Toggles the icon next to the name of the source in the filters column. Used to expand/collapse the possible
     * filters.
     * @param {object} element - the element's whose icon should be toggled
     */
    $scope.toggleFilterSourceIcon = function(element) {
      if ($(element).hasClass('glyphicon-plus')) {
        $(element).removeClass('glyphicon-plus');
        $(element).addClass('glyphicon-minus');
      } else {
        $(element).removeClass('glyphicon-minus');
        $(element).addClass('glyphicon-plus');
      }
    };

    /**
     * Toggles a filter's checkbox when selected.
     * @param {object} item - the filter item to toggle
     */
    $scope.toggleFilterSelection = function(item) {
      var index = $scope.filtersSelected.indexOf(item);
      // Filter is already selected
      if (index > -1) {
        $scope.filtersSelected.splice(index, 1);
      } else {
        $scope.filtersSelected.push(item);
      }
    };

    $scope.applyFilters = function() {
      $scope.isSearching = true;
      $scope.itemsInCurrentLocation = [];
      $scope.filtersSelected.forEach(function(filter) {
        $scope.loadItemsInLocation(filter.path);
      });
    };

  }
  storeApp.controller('StoreControllerV2', StoreController);

})();
