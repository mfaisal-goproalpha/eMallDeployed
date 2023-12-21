const {connect, SchemaType} = require('mongoose')
require('dotenv').config()
const Category = require("./model")

const   addCategory = async (req, res) => {
    // data from request body
    const {cat_image, cat_name } = req.body;
    // connect database link in .env file
    try {
        // check for the existing 
        await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})
        console.log("connected")
        // chek for the existance of email in database.
        const isCategodyExist = await Category.exists({cat_name})
        if (isCategodyExist){
            res.json({
                message: "Category already Exist."
            })
        }
        else{
            // create a new collection in database
            await Category.create({cat_image, cat_name })
            res.json({
                message: "Category is successfully added to your collection"
            })
        }
    }
     catch (error) {
        res.json({
            message: error.message
        })
    }
   
}

const allCategories = async (req, res) => {

        try {
            await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})

            const categories = await Category.find()
            res.json(
                {
                     categories
                })
        }
        catch (error) {
            res.json({
                message: error.message
            })
        }
}



const deleteCategory = async (req, res) => {
    const { _id } = req.body;
    try {
      await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      const delCategory = await Category.findOneAndDelete({ _id });
      if (!delCategory) {
        res.json({
          message: 'Category not found'
        });
      } else {
        res.json({
          message: 'Deleted successfully',
          delCategory
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'An error occurred during deletion'
      });
    }
  };
  

module.exports = {addCategory, allCategories, deleteCategory}
