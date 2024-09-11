const express = require("express");
const { check } = require("express-validator");

const societyProfileControllers=require("../controllers/societyProfileControllers");
const checkAuth = require("../middlewares/tokenAuth");

const router = express.Router();


router.use(checkAuth);
router.get('/', ()=>{});

module.exports=router;