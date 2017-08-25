(function() {
  function StoreController($scope, dataProvider, FILTER_OPTIONS, CartService) {

    /** Path the user is currently in */
    var currentLocation;

    /** Name of the folder the user is currently in */
    $scope.currentLocationName;
    /** The folders/stems and groups at the user's current location */
    $scope.itemsInCurrentLocation;

    $scope.availableFilters;
    $scope.filtersSelected;
    $scope.isSearching;

    /** User's input into the search bar when searching for groups */
    $scope.searchQuery;

    /**
     * Initialization of Group Store UI. Moves the user to the home directory.
     */
    $scope.init = function() {
      $scope.filtersSelected = [];
      $scope.isSearching = false;
      $scope.availableFilters = FILTER_OPTIONS;
      $scope.goToPath('hawaii.edu:store');
    };

    /**
     * Moves the user to the path specified.
     * @param {string} path - the path to move to
     */
    $scope.goToPath = function(path) {
      currentLocation = path;
      $scope.updatePanelText();
      $scope.itemsInCurrentLocation = [];
      $scope.loadItemsInLocation(currentLocation);
    };

    /**
     * Moves the user to the previous path.
     */
    $scope.moveBackOnePath = function() {
      var previousPath = currentLocation.substr(0, currentLocation.lastIndexOf(':'));
      $scope.goToPath(previousPath);
    };

    /**
     * Builds the breadcrumb navigation.
     * @example If the user's current path is 'hawaii.edu:store:rcuh:aff', the breadcrumb will be built as
     * ['hawaii.edu:store', 'rcuh', 'aff'].
     * @returns {string[]} the current path of the user, separated by the ':' character.
     */
    $scope.buildBreadcrumb = function() {
      var breadcrumb = currentLocation.split(':');
      // Combines 'hawaii.edu' and 'store' into one breadcrumb navigator
      breadcrumb.shift();
      breadcrumb[0] = 'hawaii.edu:store';
      return breadcrumb;
    };

    /**
     * Moves the user to the new path when clicking on a breadcrumb navigator.
     * @param {number} index - the index of the breadcrumb clicked by the user
     */
    $scope.moveToBreadcrumbIndex = function(index) {
      var pathArray = currentLocation.split(':');
      // Accounts for the fact that 'hawaii.edu' and 'store' are combined in the breadcrumb
      pathArray = pathArray.slice(0, index + 2);
      var newPath = pathArray.join(':');
      $scope.goToPath(newPath);
    };

    /**
     * Loads the stems/folders and groups in a specific path.
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
      return currentLocation === 'hawaii.edu:store';
    };

    /**
     * Updates the panel title text that tell the user which folder they're in.
     */
    $scope.updatePanelText = function() {
      $scope.currentLocationName = currentLocation.slice(currentLocation.lastIndexOf(':') + 1, currentLocation.length);
    };

    /**
     * Adds a group to the user's cart.
     * @param {object} group - the group to add
     */
    $scope.addToCart = function(group) {
      CartService.addToCart(group);
    }

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

    /**
     * Clears the filters selected by the user.
     */
    $scope.clearFilters = function() {
      $scope.filtersSelected = [];
    };

    /**
     * Searches for groups matching the query entered by the user in the search bar, then loads them for display onto
     * the table.
     */
    $scope.searchForGroups = function() {
      // Only executes a search for groups when the user enters a query
      if (!!$scope.searchQuery) {
        // Shows the path column to allow users to know what path the group was found in
        $scope.isSearching = true;
        // Loads the groups founds and displays them in the table
        $scope.itemsInCurrentLocation = [];
        var groupsUrl = encodeURI('/store/api/groups/name/' + $scope.searchQuery + '/');
        dataProvider.loadData(function(d) {
          var data = d.data;
          data.forEach(function(item) {
            item.type = 'group';
            $scope.itemsInCurrentLocation.push(item);
          });
        }, groupsUrl);
      }
    };

  }
  storeApp.controller('StoreController', StoreController);

})();
