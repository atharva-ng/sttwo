const express = require("express");
const { check } = require("express-validator");

const authControllers = require("../controllers/authControllers")
const checkAuth = require("../middlewares/tokenAuth");

const router = express.Router();


router.post('/login/society', [check('emailAddress').trim().not().isEmpty().withMessage('Email cannot be empty').escape(),
check('password').trim().not().isEmpty().withMessage('Password cannot be empty')]
  , authControllers.societyLogin);

router.use(checkAuth);

router.patch('/edit',[check('isadmin').trim().not().isEmpty().withMessage('isAdmin cannot be empty').isBoolean().withMessage('isAdmin must be a boolean').escape()] ,authControllers.updateSocietyDetails);

module.exports = router;