const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  item: [
    {
      itemId: {
        type: String,
      },
      quantity: {
        type: String,
      },
      total: {
        type: String,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
