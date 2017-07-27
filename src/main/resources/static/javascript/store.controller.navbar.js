(function() {
    function NavbarController($scope, CartService) {

        $scope.getAmountInCart = function() {
            var amountInCart = CartService.getAmountInCart();
            if (amountInCart === 0) {
                return '';
            }
            return `(${amountInCart})`;
        };
    }
    storeApp.controller('NavbarController', NavbarController);

})();
