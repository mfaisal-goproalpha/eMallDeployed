const app = require('express')
const router = app.Router()
const { getProducts, addProduct, deleteProducts, ProductbyCategory, ProductbyId } = require('./controler')

router.get('/allproducts', getProducts)
router.get('/getproductbyid/:_id', ProductbyId)
router.get('/getproductbycategory/:category', ProductbyCategory)
router.post('/addproducts', addProduct)
router.delete('/deleteproducts', deleteProducts)


module.exports = router