const { Schema, model } = require('mongoose')

const shipping_Schema = new Schema({
    userId:{
        type: String,
        required:true
    },
    orderId:{
        type: String,
        required:true
    },
    fname:{
        type: String,
        lowercase: true,
        required: true
    },
    lname:{
        type: String,
        lowercase:true,
        required: true
    },
    phoneNo: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
    },
    country:{
        type: String,
        required:true,
    },
    city:{
        type: String,
        required: true
    },
    zipCode: {
        type:String,
        required: true
    },
    streetAddress:{
        type: String,
        required: true
    }
})

const shippingSchema = model("Shipping Detail", shipping_Schema)
module.exports = shippingSchema