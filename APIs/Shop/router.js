const express = require("express")
const router = express.Router()
const {signup, singin, alluser} = require("./controler")

router.post("/shop_register", signup)

router.post("/shop_login", singin)

router.get("/shop_alluser", alluser)

module.exports = router