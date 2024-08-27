const express = require("express");
const { check } = require("express-validator");

const ownerSignupController = require("../controllers/ownerSignupController");

const router = express.Router();

router.post('/',[check('firstName').trim().not().isEmpty().withMessage('First name cannot be empty').escape(),
  check('lastName').trim().not().isEmpty().withMessage('Last name cannot be empty').escape(),
  check('emailAddress').trim().not().isEmpty().withMessage('Email Address cannot be empty').escape().isEmail().withMessage("Please enter a valid email address"),
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty'),
  check('phoneNumber').trim().not().isEmpty().withMessage('Phone Number cannot be empty').isMobilePhone('any').withMessage('Please enter a valid phone number').escape()
  ],ownerSignupController.postSignupOwner);

module.exports=router;