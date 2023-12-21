const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
    {
        items: {
            type: Array
        },
        totalBill: {
            type: String
          },
        customerAddress: {
            type: String
        },
        customerName: {
            type: String
        },
        customerEmail: {
            type: String
            
        },
        order_at: { 
            type: Date,
            default: Date.now
        }
    }
)

const Order = model('order', OrderSchema)
module.exports = Order 