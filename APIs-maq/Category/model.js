const {Schema, model} = require("mongoose")

const Category_Schema = new Schema(
    {
        cat_image:{
            type: String,
            required: true,
        },
        cat_name:{
            type: String,
            required: true,
        }
    }
)

const Category = model("category", Category_Schema)
module.exports = Category