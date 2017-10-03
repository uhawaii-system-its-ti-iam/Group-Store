(function() {
  function GroupConfigurationController($scope, CartService, $uibModalInstance) {

    /** The possible ways for groups to be configured. The properties are just the number of groups selected */
    $scope.vennOptions = {
      2: [
        {
          name: 'A ∪ B',
          description: function(groups) {
            return 'Members of the ' + getGroupName(groups[0]) + ' group and the ' + getGroupName(groups[1]) + ' group, combined.';
          },
          image: 'a-union-b.png'
        },
        {
          name: 'A ∩ B',
          description: function(groups) {
            return 'Members who belong in both ' + getGroupName(groups[0]) + ' and ' + getGroupName(groups[1]) + '.';
          },
          image: 'a-intersect-b.png'
        },
        {
          name: 'A - B',
          description: function(groups) {
            return 'Members who are in the ' + getGroupName(groups[0]) + ' group, but not in the ' + getGroupName(groups[1]) + ' group.';
          },
          image: 'a-minus-b.png'
        },
        {
          name: 'B - A',
          description: function(groups) {
            return 'Members who are in the ' + getGroupName(groups[1]) + ' group, but not in the ' + getGroupName(groups[0]) + ' group.';
          },
          image: 'b-minus-a.png'
        },
        {
          name: 'default',
          description: '',
          image: 'a-union-b.png'
        }
      ],
      3: [
        {
          name: 'A ∪ B ∪ C',
          description: function(groups) {
            return 'Members of the ' + getGroupName(groups[0]) + ' group, the ' + getGroupName(groups[1]) + ' group, and the ' + getGroupName(groups[2]) + ' group, combined.';
          },
          image: 'a-union-b-union-c.png'
        },
        {
          name: 'A ∩ B ∩ C',
          description: function(groups) {
            return 'Members who belong in all three ' + getGroupName(groups[0]) + ', ' + getGroupName(groups[1]) + ', and ' + getGroupName(groups[2]) + ' groups.';
          },
          image: 'a-intersect-b-intersect-c.png'
        },
        {
          name: 'default',
          description: '',
          image: 'a-union-b-union-c.png'
        }
      ]
    };

    /** The configuration selected by the user */
    $scope.selected;

    /**
     * @returns {object[]} an array of groups in the user's cart
     */
    $scope.getGroupsInCart = function() {
      return CartService.getGroupsInCart();
    };

    /**
     * @returns {number} the number of groups in the user's cart
     */
    $scope.getAmountInCart = function() {
      return CartService.getAmountInCart();
    };

    /**
     * Closes the modal.
     */
    $scope.closeModal = function() {
      $uibModalInstance.dismiss();
    };

    /**
     * Stores the group configuration option selected by the user.
     * @param {object} option - the option selected by the user
     */
    $scope.setSelected = function(option) {
      $scope.selected = option;
    };

    /**
     * Returns the configuration selected by the user. If the user has not made a selection, it returns the an
     * object containing the default venn diagram.
     * @returns {object} the configuration selected by the user, or the default venn diagram
     */
    $scope.getSelected = function() {
      if (!!$scope.selected) {
        return $scope.selected;
      }
      // Returns the default venn diagram object, which is stored in the last index of each venn diagram option
      return $scope.vennOptions[$scope.getAmountInCart()].slice(-1)[0];
    };

    /**
     * Returns the letter corresponding to an integer's position in the alphabet.
     * @example 0 returns 'A'
     * @example 25 returns 'Z'
     * @param {number} index - the integer position in the alphabet
     * @returns {string} the character corresponding to index
     */
    $scope.getCorrespondingLetter = function(index) {
      return String.fromCharCode(index + 65);
    };

    /**
     * Returns the name of the group (everything after the last semicolon (':') when passed in the group's full path).
     * @param {string} group - the full path of the group
     * @returns {string} the name of the group
     */
    function getGroupName(group) {
      var lastSemicolonPosition = group.lastIndexOf(':');
      return group.substring(lastSemicolonPosition + 1, group.length);
    }

  }

  storeApp.controller('GroupConfigurationController', GroupConfigurationController);
})();