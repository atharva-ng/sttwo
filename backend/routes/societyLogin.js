const express = require("express");
const { check } = require("express-validator");

const societyLoginController = require("../controllers/societyLoginController");

const router = express.Router();

router.post('/',[check('email').trim().not().isEmpty().withMessage('Email cannot be empty').escape(), 
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty')] 
  ,societyLoginController.societyLogin);

module.exports=router;


