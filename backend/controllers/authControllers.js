const HttpError = require("../models/http-error");

const { getRoomSizeQuery, getMaintenanceHeadsQuery, postSocietyDetailsQuery, postOwnerDetailsQuery, loginQuery } = require("../dbUtils/authDBQueries");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');

const postSignupSociety = async (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req);

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

const postSignupOwner = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { firstName, lastName, emailAddress, password, phoneNumber } = req.body;

  const ownerDetails = {
    "firstName": firstName,
    "lastName": lastName,
    "emailAddress": emailAddress,
    "password": password,
    "phoneNumber": phoneNumber
  }
  try {
    await postOwnerDetailsQuery(ownerDetails);
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      return next(new HttpError("Something went wrong", 500));
    }
  }

  res.status(200).json({
    "ownerDetails": ownerDetails
  });
};

const societyLogin = async (req, res, next) => {
  // console.log(req);
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

    let token;
    try {
      token = jwt.sign(
        {
          userId: id,
          userType: "SOCIETY"
        },
        'authentacationkey_12987655434',
        { expiresIn: '1h' }
      );
    } catch (err) {
      throw new HttpError("Unable to login", 500);
    }
    res.status(200).json({ "token": token, userType: "SOCIETY" });
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};

const ownerLogin = async (req, res, next) => {
  // console.log(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { emailAddress, password } = req.body;

  try {
    const id = await loginQuery(emailAddress, password, 2);
    if (id == -1) {
      throw new HttpError("Invalid credentials", 401);
    }

    let token;
    try {
      token = jwt.sign(
        {
          userId: id,
          userType: "OWNER"
        },
        'authentacationkey_12987655434',
        { expiresIn: '1h' }
      );
    } catch {
      if (!isValid) {
        throw new HttpError("Unable to login", 500);
      }
    }
    res.status(200).json({ "token": token, userType: "OWNER" });
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};

exports.postSignupSociety = postSignupSociety;
exports.postSignupOwner = postSignupOwner;
exports.societyLogin = societyLogin;
exports.ownerLogin = ownerLogin;