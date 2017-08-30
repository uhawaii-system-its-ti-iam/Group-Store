(function() {

  storeApp.factory('CartService', function() {
    var cart = [];
    return {
      /**
       * Adds a group to the cart. Only adds the group if it doesn't exist in the cart already.
       * @param {object} group - the group to add
       */
      addToCart: function(group) {
        if (cart.indexOf(group) === -1) {
          cart.push(group);
        }
      },
      /**
       * Removes the group from the cart.
       * @param {object} group - the group to remove
       */
      removeFromCart: function(group) {
        var index = cart.indexOf(group);
        if (index > -1) {
          cart.splice(index, 1);
        }
      },
      /**
       * @returns {object[]} an array of groups in the user's cart
       */
      getGroupsInCart: function() {
        return cart;
      },
      /**
       * @returns {number} the amount of groups in the user's cart
       */
      getAmountInCart: function() {
        return cart.length;
      },
    };
  });
})();
