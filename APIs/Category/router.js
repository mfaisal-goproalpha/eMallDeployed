const express = require("express")
const router = express.Router()

const multer = require('multer')
const {testurl, addCategory, allCategories, deleteCategory} = require("./controler")


//file uploading
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//          cb(null, "images")
//     },
//     filename: function(req, file, cb){
//          cb( null,     file.originalname+'.jpeg' )
//     }
// })
  

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "Client/images")
        },
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    })
}).single("cat_image")




router.get("/testurl", testurl)

router.post("/addcategory", upload,  addCategory)


router.get("/allcategories", allCategories)

router.delete("/deletecategory", deleteCategory)


module.exports = router 