(function() {
  function GroupConfigurationController($scope, CartService, $uibModalInstance) {

    $scope.getGroupsInCart = function() {
      return CartService.getGroupsInCart();
    };

    $scope.getAmountInCart = function() {
      return CartService.getAmountInCart();
    };

    $scope.closeModal = function() {
      $uibModalInstance.dismiss();
    };
  }

  storeApp.controller('GroupConfigurationController', GroupConfigurationController);
})();