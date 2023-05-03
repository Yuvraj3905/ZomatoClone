const express = require('express');

const app = express();

const userRoutes=require('./routes/user');
const restaurantRoutes=require('./routes/restaurant');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.set('strictQuery', true); //only used in 7th version for retaining database like if we have 4 field user cant put 6 fields in it
mongoose
  .connect('mongodb://127.0.0.1:27017/zomato-g14')
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console(err);
  });

app.use(express.urlencoded({extended:true}));//for not seeing undefined in body
app.use(bodyParser.json)

  //routes
app.use(userRoutes)
app.use(restaurantRoutes)
app.get('/', (req, res) => {
  res.send('asf');
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
