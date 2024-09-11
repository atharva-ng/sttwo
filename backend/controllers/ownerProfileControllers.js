const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');


const getOwnerProfile = async (req,res,next) => {
  console.log(req.userData.userId)
  return res.status(200).json({
    "message":"Success"
  });
}


exports.getOwnerProfile = getOwnerProfile;
