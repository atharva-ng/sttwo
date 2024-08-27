const express = require("express");
const { check } = require("express-validator");

const authControllers= require("../controllers/authControllers")

const router = express.Router();

router.get('/signup/society', authControllers.getSignupSociety);

router.post('/signup/society',[check('name').trim().not().isEmpty().withMessage('Name cannot be empty').escape(),
  check('dateOfEstablishment').trim().not().isEmpty().withMessage('Date of Establishment cannot be empty').isDate().withMessage('Date of Establishment must be a valid date').escape(),
  check('emailAddress').trim().not().isEmpty().withMessage('Email Address cannot be empty').escape().isEmail().withMessage("Please enter a valid email address"),
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty'),
  check('phoneNumber').trim().not().isEmpty().withMessage('Phone Number cannot be empty').isMobilePhone('any').withMessage('Please enter a valid phone number').escape(),
  check('address').trim().not().isEmpty().withMessage('Address cannot be empty').escape(),
  check('city').trim().not().isEmpty().withMessage('City cannot be empty').escape(),
  check('state').trim().not().isEmpty().withMessage('State cannot be empty').escape(),
  check('pincode').trim().not().isEmpty().withMessage('Pincode cannot be empty').isNumeric().withMessage("Pincode must be a number").escape(),
  check('numberOfWings').trim().not().isEmpty().withMessage('Number of wings cannot be empty').isNumeric().withMessage("Number of wings must be a number").escape(),
  check('registrationNumber').trim().not().isEmpty().withMessage('Registration Number cannot be empty').escape()
  ],authControllers.postSignupSociety);

router.post('/signup/owner',[check('firstName').trim().not().isEmpty().withMessage('First name cannot be empty').escape(),
  check('lastName').trim().not().isEmpty().withMessage('Last name cannot be empty').escape(),
  check('emailAddress').trim().not().isEmpty().withMessage('Email Address cannot be empty').escape().isEmail().withMessage("Please enter a valid email address"),
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty'),
  check('phoneNumber').trim().not().isEmpty().withMessage('Phone Number cannot be empty').isMobilePhone('any').withMessage('Please enter a valid phone number').escape()
  ],authControllers.postSignupOwner);

router.post('/login/society',[check('emailAddress').trim().not().isEmpty().withMessage('Email cannot be empty').escape(), 
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty')] 
  ,authControllers.societyLogin);

router.post('/login/owner',[check('emailAddress').trim().not().isEmpty().withMessage('Email cannot be empty').escape(), 
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty')] 
  ,authControllers.ownerLogin);

module.exports=router;