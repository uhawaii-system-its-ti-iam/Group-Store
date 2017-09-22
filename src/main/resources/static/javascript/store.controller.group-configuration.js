(function() {
  function GroupConfigurationController($scope, CartService, $uibModalInstance) {

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

    $scope.selected;

    $scope.getGroupsInCart = function() {
      return CartService.getGroupsInCart();
    };

    $scope.getAmountInCart = function() {
      return CartService.getAmountInCart();
    };

    $scope.closeModal = function() {
      $uibModalInstance.dismiss();
    };

    $scope.setSelected = function(option) {
      return $scope.selected = option;
    };

    $scope.getSelected = function() {
      if (!!$scope.selected) {
        return $scope.selected;
      } else {
        return $scope.vennOptions[$scope.getAmountInCart()].slice(-1)[0];
      }
    };

    $scope.getCorrespondingLetter = function(index) {
      return String.fromCharCode(index + 65);
    };

  }

  storeApp.controller('GroupConfigurationController', GroupConfigurationController);
})();