(function() {

  storeApp.factory('CartService', function() {
    var cart = new Set();
    return {
      addToCart: function(group) {
        cart.add(group);
      },
      removeFromCart: function(group) {
        cart.delete(group);
      },
      getGroupsInCart: function() {
        return [...cart];
      },
      getAmountInCart: function() {
        return cart.size;
      },
    };
  });
})();
