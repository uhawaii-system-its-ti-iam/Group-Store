(function() {
  function StoreController($scope, dataProvider, FILTER_OPTIONS, CartService) {

    /** User's current path/location */
    var currentLocation;

    /** Name of the folder the user is currently in */
    $scope.currentLocationName;
    /** The folders/stems and groups at the user's current location, either while browsing or filtering/searching */
    $scope.itemsInCurrentLocation;

    /** The filters available for use by the user on the left side of the page */
    $scope.availableFilters;
    /** The filters selected by the user */
    $scope.filtersSelected;
    /** Mode to tell whether a user is browsing through the store, or just applied filters/using the search bar */
    $scope.isSearching;

    /** User's input into the search bar when searching for groups */
    $scope.searchQuery;
    /** User's query when clicking on the search icon */
    $scope.queryEntered;

    /** Used for displaying alerts for various errors */
    $scope.errorMessages = [
      { notEnoughCharacters: false },
      { noResultsFound: false }
    ];

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
      // If the user is moving to a folder after executing applying a filter, this will remove the 'Path' column
      $scope.isSearching = false;
      $scope.updatePanelText();
      // Loads all the stems/folders and groups at the user's current location
      $scope.itemsInCurrentLocation = [];
      $scope.loadItemsInLocation(currentLocation);
    };

    /**
     * Moves the user back one folder.
     */
    $scope.moveBackOnePath = function() {
      // Previous path is defined as everything before the last ':'
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
      // To include the folder the user clicked on, and to account for 'hawaii.edu' and 'store' being combined in the
      // breadcrumb as index 0, add 2 to the index clicked on to extract the new path
      pathArray = pathArray.slice(0, index + 2);
      var newPath = pathArray.join(':');
      $scope.goToPath(newPath);
    };

    /**
     * Loads the stems/folders and groups in a specific path.
     * @param {string} path - the path to load the items
     */
    $scope.loadItemsInLocation = function(path) {
      var stemsUrl = encodeURI('/store/api/stems/children/' + path + '/');
      var groupsUrl = encodeURI('/store/api/groups/path/' + path + '/');
      // Load stems/folders
      dataProvider.loadData(function(d) {
        var data = d.data;
        data.forEach(function (item) {
          // Attach a 'type' property with the value of 'stem' to differentiate these with groups
          item.type = 'stem';
          $scope.itemsInCurrentLocation.push(item);
        });
      }, stemsUrl);
      // Load groups
      dataProvider.loadData(function(d) {
        var data = d.data;
        data.forEach(function(item) {
          // Attach a 'type' property with the value of 'group' to differentiate these with stems/folders
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
     * Updates the panel title text that tells the user which folder they're in.
     */
    $scope.updatePanelText = function() {
      // The folder name is defined as everything after the last ':' delimiter
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
      // Filter is already selected, so have it uncheck its box
      if (index > -1) {
        $scope.filtersSelected.splice(index, 1);
      } else {
        // Not selected, so check the box
        $scope.filtersSelected.push(item);
      }
    };

    /**
     * Applies the filters selected by the user.
     */
    $scope.applyFilters = function() {
      // Prevent the user from applying filters if no filters were selected
      if ($scope.filtersSelected.length > 0) {
        // Adds the 'Path' column to show users the location of the items
        $scope.isSearching = true;
        // Loads the items that correspond to the selected filters
        $scope.itemsInCurrentLocation = [];
        $scope.filtersSelected.forEach(function(filter) {
          $scope.loadItemsInLocation(filter.path);
        });
      }
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
      // Display an alert if user enters a query that is less than 3 characters
      if ($scope.searchQuery.length < 3) {
        $scope.errorMessages.notEnoughCharacters = true;
      } else {
        // Store the query entered in case no results are found
        $scope.queryEntered = $scope.searchQuery;
        // Hide all alerts related to searching
        $scope.errorMessages.noResultsFound = false;
        $scope.errorMessages.notEnoughCharacters = false;
        var groupsUrl = encodeURI('/store/api/groups/name/' + $scope.searchQuery + '/');
        dataProvider.loadData(function (d) {
          var data = d.data;
          // Results were found, so load them onto the table and display it
          if (data.length > 0) {
            $scope.itemsInCurrentLocation = [];
            data.forEach(function (item) {
              item.type = 'group';
              $scope.itemsInCurrentLocation.push(item);
            });
            // Shows the path column to allow users to know what path the group was found in
            $scope.isSearching = true;
          } else {
            // Otherwise display an alert saying no results were found
            $scope.errorMessages.noResultsFound = true;
          }
        }, groupsUrl);
      }
    };

  }
  storeApp.controller('StoreController', StoreController);

})();
