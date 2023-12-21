const { Schema, model } = require('mongoose')
const { TRUE } = require('sass')

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
        required,
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

const BillingSchema = model("Billing Detail", billing_Schema)
module.exports = BillingSchema