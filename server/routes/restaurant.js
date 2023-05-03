const express = require('express');
const Restaurant =require('../models/Restaurant');

let router=express.Router();
//to add a rest
router.post('/rest', async (req, res) => {
  let rest = req.body;
  let dbRest = new Restaurant({
    name: rest.name,
    city: rest.city,
  });
  await dbRest.save();
  res.json(dbRest);
});

module.exports = router;
