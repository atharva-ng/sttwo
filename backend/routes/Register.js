const express = require("express");
const { check } = require("express-validator");

const registerControllers=require("../controllers/registerControllers");

const router = express.Router();

router.get('/', registerControllers.registerSociety);

module.exports=router;