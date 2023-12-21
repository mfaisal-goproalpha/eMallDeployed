const { Schema, model } = require('mongoose')

const orderProducts = new Schema({

        orderId:{
            type: String,
            required:true
        },
        productId:{
            type: String,
            required:true
        },
        Quantity:{
            type: Number,
            required:true
        }
    
})

const Product = model('Order-Products', orderProducts)
module.exports = Product 