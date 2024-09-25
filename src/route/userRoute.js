const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");



router.post("/register", controller.createUser);



module.exports = router;  
