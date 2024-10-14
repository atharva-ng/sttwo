const HttpError = require("../models/http-error");

const { postSocietyDetailsQuery, loginQuery, updateSocietyDetailsQuery } = require("../dbUtils/authDBQueries");
const {getAdminStatus}= require("../dbUtils/getters");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');


const postSignupSociety = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { name, dateOfEstablishment, emailAddress, password, phoneNumber, address, city, state, pincode, numberOfWings, registrationNumber } = req.body;

  const societyDetails = {
    "name": name,
    "dateOfEstablishment": dateOfEstablishment,
    "emailAddress": emailAddress,
    "password": password,
    "phoneNumber": phoneNumber,
    "address": address,
    "city": city,
    "state": state,
    "pincode": pincode,
    "numberOfWings": numberOfWings,
    "registrationNumber": registrationNumber
  }
  try {
    await postSocietyDetailsQuery(societyDetails);
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      return next(new HttpError("Something went wrong", 500))
    }
  }
  res.status(200).json({
    "societyDetails": societyDetails
  });
};


const societyLogin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { emailAddress, password } = req.body;

  try {
    const id = await loginQuery(emailAddress, password, 1);
    if (id == -1) {
      throw new HttpError("Invalid credentials", 401);
    }

    const adminStatus = await getAdminStatus(id)[0].isadmin;
   

    let token;
    try {
      token = jwt.sign(
        {
          userId: id,
          adminStatus
        },
        'authentacationkey_12987655434',
        { expiresIn: '1h' }
      );
    } catch (err) {
      throw new HttpError("Unable to login", 500);
    }
    res.status(200).json({ "token": token, "adminstatus": adminStatus });
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};

const updateSocietyDetails= async (req, res, next) => {
  const userId=req.userData.userId;

  const {isadmin } = req.body;

  try{
    const noticeData = await updateSocietyDetailsQuery(userId, isadmin);
    return res.status(200).json({"message": "Success"});
  }catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
}

exports.postSignupSociety = postSignupSociety;
exports.societyLogin = societyLogin;
exports.updateSocietyDetails=updateSocietyDetails;