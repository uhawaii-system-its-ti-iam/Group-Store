(function() {
  function StoreController($scope, dataProvider, FILTER_OPTIONS, CartService, STORE_HOME, $uibModal) {

    /** User's current location */
    var currentLocation;

    /** Name of the folder the user is currently in */
    $scope.currentFolder;
    /** The folders and groups that are displayed on the table */
    $scope.itemsInCurrentLocation;

    /** The filters available for use by the user on the left side of the page */
    $scope.availableFilters;
    /** The filters selected by the user */
    $scope.filtersSelected;

    /** Whether the user is browsing through the store, or is using the search bar/filters */
    $scope.isBrowsing;

    /** User's input into the search bar when searching for groups */
    $scope.searchQuery;
    /** User's query when executing a search */
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
      // Load the groups in the cart from a previous session (if any)
      CartService.loadCart();
      $scope.availableFilters = FILTER_OPTIONS;
      $scope.filtersSelected = [];
      $scope.isBrowsing = true;
      // Move the user to the Group Store home directory
      $scope.goToLocation(STORE_HOME);
    };

    /**
     * Moves the user to the new location specified.
     * @param {string} location - the path to move to
     */
    $scope.goToLocation = function(location) {
      currentLocation = location;
      $scope.isBrowsing = true;
      $scope.updateCurrentFolder();
      // Clear the items in the table, then load the new folders and groups
      $scope.itemsInCurrentLocation = [];
      $scope.loadItemsInLocation(currentLocation);
    };

    /**
     * Moves the user back one folder.
     */
    $scope.moveBackOneFolder = function() {
      // Previous folder is defined as everything before the last ':'
      var previousFolder = currentLocation.substr(0, currentLocation.lastIndexOf(':'));
      $scope.goToLocation(previousFolder);
    };

    /**
     * Builds the breadcrumb navigation.
     * @example If the user's current path is 'hawaii.edu:store:rcuh:aff', the breadcrumb will be built as
     * ['hawaii.edu:store', 'rcuh', 'aff'].
     * @returns {string[]} the current path of the user, separated by the ':' character.
     */
    $scope.buildBreadcrumb = function() {
      var breadcrumb = currentLocation.split(':');
      // Combines 'hawaii.edu' and 'store' into one breadcrumb navigator to prevent users from going to a location
      // outside of the store
      breadcrumb.shift();
      breadcrumb[0] = STORE_HOME;
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
      $scope.goToLocation(newPath);
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
      return currentLocation === STORE_HOME;
    };

    /**
     * Updates the header text that says the user's current folder name.
     */
    $scope.updateCurrentFolder = function() {
      // The folder name is defined as everything after the last ':' delimiter
      $scope.currentFolder = currentLocation.slice(currentLocation.lastIndexOf(':') + 1, currentLocation.length);
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
      // Filter is already selected, so uncheck its box
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
        $scope.isBrowsing = false;
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
      if (!$scope.searchQuery || $scope.searchQuery.length < 3) {
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
            // Toggle the mode to show the path column, allowing users to know what path the group was found in
            $scope.isBrowsing = false;
          } else {
            // Otherwise display an alert saying no results were found
            $scope.errorMessages.noResultsFound = true;
          }
        }, groupsUrl);
      }
    };

    /**
     * Allows the users to re-browse through the store. It will load the items at the user's location prior to
     * searching/applying filters.
     */
    $scope.reset = function() {
      $scope.goToLocation(currentLocation);
    };

    $scope.openGroupConfiguration = function() {
      var modal = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'group-configuration',
        controller: 'GroupConfigurationController'
      });

      modal.result.catch(function() {
        modal.close();
      });
    };

  }
  storeApp.controller('StoreController', StoreController);

})();
