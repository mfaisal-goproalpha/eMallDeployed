const mongoose = require('mongoose')

const OrderSchema =new  mongoose.Schema(
    {
        orderDate: { type: Date, default: Date.now },
		shop_id: { type: String, require: false },
        user_id: { type: String, require: false },
        subTotal:{ type:Number, require: true
        },
    }
)

const order = mongoose.model('order', OrderSchema)
module.exports = order 
