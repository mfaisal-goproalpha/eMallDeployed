const {connect, SchemaType} = require('mongoose')
require('dotenv').config()
const Category = require("./model")
const multer = require('multer')


const addCategory = async (req, res) => {
    // data from request body
    //const { cat_name, cat_image } = req.body;
    // try {
    //     res.json({
    //       cat_name : cat_name,
    //       cat_image : cat_image,
    //     })
    //   }
    //   catch (error) {
    //       res.json({
    //           message: error.message,
    //           name: error.name
    //       })
    //   }

        // connect database link in .env file
    /**/
    try {
      const { cat_name, shop_id } = req.body;
      const cat_image = req.file.originalname; 

      // Access cookies using req.cookies
      const token = req.cookies;
      
      // res.json({
      //     message9: cat_image
      // })

        // check for the existing 
        /**/
        await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})
        //console.log("connected")
        //console.log('Cookie in controller=> ', );
        // chek for the existance of email in database.
        //message: "Category already Exist. "+token
        const isCategodyExist = await Category.exists({cat_name})
        if (isCategodyExist){
            res.json({
                message: (req.body.shop_id)
            })
        }
        else{
            // create a new collection in database
			      
            //message: "Category is successfully added to your collection "+token
            await Category.create({cat_image, shop_id, cat_name })
            res.json({
                message: (req.body.cat_name)
            })
        }
    }
     catch (error) {
        res.json({
            message: error.message
        })
    }

   
}

const testurl = async (req, res) => {
  try {
    res.json({
      message : 'testurl is working in controller method'
    })
  }
  catch (error) {
      res.json({
          message: error.message
      })
  }
}

const allCategories = async (req, res) => {

        try {
          const { shop_id } = req.query;
            await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})

            const categories = await Category.find({ shop_id })
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
  


module.exports = {testurl, addCategory, allCategories, deleteCategory}
