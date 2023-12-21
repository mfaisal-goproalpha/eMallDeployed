const express = require("express")
const router = express.Router()
const {addCategory, allCategories, deleteCategory} = require("./controler")


router.post("/addcategory", addCategory)


router.get("/allcategories", allCategories)

router.delete("/deletecategory", deleteCategory)


module.exports = router 