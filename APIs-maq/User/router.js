const express = require("express")
const router = express.Router()
const {signup, singin, alluser, userById} = require("./controller")

router.post("/signup", signup)
router.post("/login", singin)
router.get("/alluser", alluser)

module.exports = router