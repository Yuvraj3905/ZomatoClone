const mongoose = require('mongoose');

let productSchema=new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String},
    description: {type: String},
    restaurants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ]
})
let Product=mongoose.model('Product', productSchema)
module.exports = Product;