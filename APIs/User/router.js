const express = require("express")
const router = express.Router()
const {signup, singin, alluser} = require("./controler")

router.post("/register", signup)

router.post("/login", singin)

router.get("/alluser", alluser)

module.exports = router