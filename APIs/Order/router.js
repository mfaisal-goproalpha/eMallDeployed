const app = require('express')
const router = app.Router()
const { addOrders, orderbyId, allorders,getcustomerorders, createOrder, addShippingAndBilling, fetchOrder, productByOrderId} = require('./controler')

router.post('/createorder', addOrders)
router.get('/allorders', allorders)
router.get('/getcustomerorders', getcustomerorders)
router.get('/orderbyid/:_id', orderbyId)

router.post("/billshipaddress", addShippingAndBilling)

router.post("/create-order", createOrder)


router.get("/fetch-order", fetchOrder)

router.get("/products-by-orderid/:_id", productByOrderId)


module.exports = router