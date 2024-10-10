const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

// const postSignupSociety = async (req, res, next) => {
//   // console.log(req.body);
//   const errors = validationResult(req);
//   console.log(errors);

//   if (!errors.isEmpty()) {
//     const error = new HttpError("Invalid inputs passed, please check your data", 422);
//     error.data = errors.array();
//     return next(error);
//   }

//   const { name, dateOfEstablishment, emailAddress, password, phoneNumber, address, city, state, pincode, numberOfWings, registrationNumber } = req.body;

//   const societyDetails = {
//     "name": name,
//     "dateOfEstablishment": dateOfEstablishment,
//     "emailAddress": emailAddress,
//     "password": password,
//     "phoneNumber": phoneNumber,
//     "address": address,
//     "city": city,
//     "state": state,
//     "pincode": pincode,
//     "numberOfWings": numberOfWings,
//     "registrationNumber": registrationNumber
//   }
//   try {
//     await postSocietyDetailsQuery(societyDetails);
//   } catch (err) {
//     if (err instanceof HttpError) {
//       return next(err);
//     } else {
//       return next(new HttpError("Something went wrong", 500))
//     }
//   }
//   res.status(200).json({
//     "societyDetails": societyDetails
//   });
// };

// exports.postSignupSociety = postSignupSociety;
// exports.societyLogin = societyLogin;