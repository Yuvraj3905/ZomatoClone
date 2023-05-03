const express = require('express');
const router = require('router');
const Restaurant = require('../models/Restaurant');

router.post('/restaurant/:restaurantId/product', async (req, res) => {
  let { restaurantId } = req.params;
  let foundRestaurant = await Restaurant.findById({ restaurantId });
  if (!foundRestaurant) {
    res.json({ error: 'Restaurant not found' });
  } else {
    let product = req.body;
    let newProduct = new Product({
      name: product.name,
      price: product.price,
      img: product.img,
      description: product.description,
      restaurants: foundRestaurant._id,
    });

    if (!foundRestaurant.products) {
      foundRestaurant.products = [];
    }

    foundRestaurant.products.push(newProduct);

    //promise.all agar ek se zeada cheez save karni hai aur dono ka .then mein resolve hona zaroori hai
    Promise.all([dbProduct.save(), foundRestaurant.save()])
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  }
});

module.exports = router;
