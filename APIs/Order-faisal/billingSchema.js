const { Schema, model } = require('mongoose')

const billing_Schema = new Schema({
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
        require: true,
    },
    city:{
        type: String,
        require: true,
    },
    zipCode: {
        type:String,
        require: true,
    },
    streetAddress:{
        type: String,
        require: true,
    },

    orderDate:{
        type: Date,
        defaul: Date.now
    },

})

const BillingSchema = model("Billing Detail", billing_Schema)
module.exports = BillingSchema