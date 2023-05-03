const mongoose = require('mongoose');

let restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
