const app = require('express')
const router = app.Router()
const { addOrders, orderbyId, allorders, addBilling, addShipping, createOrder, addShippingAndBilling, fetchOrder, productByOrderId} = require('./controler')

router.post('/createorder', addOrders)
router.get('/allorders', allorders)
router.get('/orderbyid/:_id', orderbyId)


router.post("/billing-address", addBilling)
router.post("/shipping-address", addShipping)
router.post("/billing-shipping-adress", addShippingAndBilling)

router.post("/create-order", createOrder)


router.get("/fetch-order", fetchOrder)

router.get("/products-by-orderid/:_id", productByOrderId)


module.exports = router