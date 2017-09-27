(function() {
  function GroupConfigurationController($scope, CartService, $uibModalInstance) {

    /** The possible ways for groups to be configured. The properties are just the number of groups selected */
    $scope.vennOptions = {
      2: [
        { name: 'A ∪ B', description: 'People in either group A or group B', image: 'a-union-b.png' },
        { name: 'A ∩ B', description: 'People in both group A and group B', image: 'a-intersect-b.png' },
        { name: 'A - B', description: 'People in group A, but are not in group B', image: 'a-minus-b.png' },
        { name: 'B - A', description: 'People in group B, but are not in group A', image: 'b-minus-a.png' },
        { name: 'default', description: '', image: 'two-default.png' }
      ],
      3: [
        { name: 'A ∪ B ∪ C', description: 'Combine people in groups A, B, and C', image: 'a-union-b-union-c.png' },
        { name: 'A ∩ B ∩ C', description: 'People in groups A, B, and C', image: 'a-intersect-b-intersect-c.png' },
        { name: 'default', description: '', image: 'three-default.png' }
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

  }

  storeApp.controller('GroupConfigurationController', GroupConfigurationController);
})();