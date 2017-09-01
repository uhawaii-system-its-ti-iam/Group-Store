(function() {
  function NavbarController($scope, CartService) {

    /**
     * @returns {string} the empty string if the user has 0 groups in their cart, otherwise returns the number of groups
     * surrounded in parentheses.
     */
    $scope.getAmountInCart = function() {
      var amountInCart = CartService.getAmountInCart();
      if (amountInCart === 0) {
        return '';
      }
      return '(' + amountInCart + ')';
    };
  }
  storeApp.controller('NavbarController', NavbarController);

})();
