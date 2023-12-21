const mongoose = require('mongoose')

const OrderSchema =new  mongoose.Schema(
    {
        orderDate: { type: Date, default: Date.now },
        subTotal:{ type:Number, require: true
        },
    }
)

const order = mongoose.model('order', OrderSchema)
module.exports = order 
