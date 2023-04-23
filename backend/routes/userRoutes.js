const express = require("express")
const router =  express.Router()
const { registerUser ,authUser, allUsers} = require("../controllers/userControllers")

router.post('/',registerUser)
router.post('/sign',authUser)
module.exports = router