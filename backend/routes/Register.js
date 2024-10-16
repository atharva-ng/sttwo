const express = require("express");
const { check, body } = require("express-validator");

const registerControllers = require("../controllers/registerControllers");


const router = express.Router();

const societyDetailsValidation = [
  check('societyDetails.name').trim().not().isEmpty().withMessage('Society Name cannot be empty').escape(),
    check('societyDetails.dateOfEstablishment').trim().not().isEmpty().withMessage('Society Date of Establishment cannot be empty').isDate().withMessage('Date of Establishment must be a valid date').escape(),
    check('societyDetails.emailAddress').trim().not().isEmpty().withMessage('Society Email Address cannot be empty').escape().isEmail().withMessage("Please enter a valid email address"),
    check('societyDetails.password').trim().not().isEmpty().withMessage('Society Password cannot be empty'),
    check('societyDetails.phoneNumber').trim().not().isEmpty().withMessage('Society Phone Number cannot be empty').isMobilePhone('any').withMessage('Please enter a valid phone number').escape(),
    check('societyDetails.address').trim().not().isEmpty().withMessage('Society Address cannot be empty').escape(),
    check('societyDetails.city').trim().not().isEmpty().withMessage('Society City cannot be empty').escape(),
    check('societyDetails.state').trim().not().isEmpty().withMessage('Society State cannot be empty').escape(),
    check('societyDetails.pincode').trim().not().isEmpty().withMessage('Society Pincode cannot be empty').isNumeric().withMessage("Pincode must be a number").escape(),
    check('societyDetails.numberOfWings').trim().not().isEmpty().withMessage('Society Number of wings cannot be empty').isNumeric().withMessage("Number of wings must be a number").escape(),
    check('societyDetails.registrationNumber').trim().not().isEmpty().withMessage('Society Registration Number cannot be empty').escape()
  ];

const wingInformationValidation = [
  body('wingInformation.*.name').trim().not().isEmpty().withMessage('Wing Name cannot be empty').escape(),
  body('wingInformation.*.floors').trim().not().isEmpty().withMessage('Number of Floors cannot be empty').isNumeric({min:1}).withMessage("'Number of Floors must be a number").escape(),
  body('wingInformation.*.roomsPerFloor').trim().not().isEmpty().withMessage('Rooms per Floor cannot be empty').isNumeric({min:1}).withMessage("Rooms per Floor must be a number").escape(),
  body('wingInformation.*.roomDetails.*.roomNumber').isInt({ min: 1 }).trim().not().isEmpty().withMessage('Rooms Number cannot be empty').isNumeric({min:1}).withMessage("Rooms Number must be a number").escape(),
  body('wingInformation.*.roomDetails.*.roomSize').trim().not().isEmpty().withMessage('Room Size cannot be empty').isString().withMessage('Room size must be a string').escape(),
  body('wingInformation.*.roomDetails.*.maintainanceAmount').trim().not().isEmpty().withMessage('Maintainance Amount cannot be empty').isNumeric().withMessage("Maintainance Amount must be a number").escape(),
  body('wingInformation.*.roomDetails.*.maintainanceHeadAmount.*').trim().not().isEmpty().withMessage("Maintainance Head's Amount cannot be empty").isNumeric().withMessage("Maintainance Head's Amount must be a number").escape()
];


router.get('/', registerControllers.getRegisterSociety);

router.post('/',[...societyDetailsValidation, ...wingInformationValidation] ,registerControllers.registerSociety);

module.exports = router;