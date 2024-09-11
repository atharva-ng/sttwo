const express = require("express");
const { check } = require("express-validator");

const ownerProfileControllers=require("../controllers/ownerProfileControllers");

const checkAuth = require("../middlewares/tokenAuth");

const router = express.Router();

router.use(checkAuth);

router.get('/', ownerProfileControllers.getOwnerProfile);

module.exports=router;