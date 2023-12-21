const {model, Schema} = require("mongoose")

const shop_module = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },  
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
 
    password: {
        type: String, 
        required: true,
    },
    
    role: {
        type: String, 
        required: true,
        default: "user"
    },
    dp: {
        type: String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
    },
    joining: {
        type: String, 
        default: Date.now
    },
    address: {
        type: String,
        required: true

    }
})

const Shop = model("shop", shop_module)
module.exports = Shop