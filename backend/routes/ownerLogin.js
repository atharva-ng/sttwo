const express = require("express");
const { check } = require("express-validator");

const ownerLoginController = require("../controllers/ownerLoginController");

const router = express.Router();

router.post('/',[check('emailAddress').trim().not().isEmpty().withMessage('Email cannot be empty').escape(), 
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty')] 
  ,ownerLoginController.ownerLogin);

module.exports=router;


