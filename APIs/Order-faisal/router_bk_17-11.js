const app = require('express')
const router = app.Router()
const { addOrders, orderbyId, allorders} = require('./controler')

router.post('/createorder', addOrders)
router.get('/allorders', allorders)
router.get('/orderbyid/:_id', orderbyId)

module.exports = router