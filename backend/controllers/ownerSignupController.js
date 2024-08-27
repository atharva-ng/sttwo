const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const{postOwnerDetailsQuery}= require('../dbUtils/queries-owner-signup');

const postSignupOwner = async (req,res,next) => {
  const errors= validationResult(req);
  
  if(!errors.isEmpty()){
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {firstName, lastName, emailAddress, password, phoneNumber} = req.body;
  
  const ownerDetails = {
    "firstName": firstName,
    "lastName": lastName,
    "emailAddress":emailAddress,
    "password":password,
    "phoneNumber":phoneNumber
  }
  try{
    await postOwnerDetailsQuery(ownerDetails);
  }catch(err){
    if(err instanceof HttpError){
      return next(err);
    }else{
      return next(new HttpError("Something went wrong", 500));
    }
  }

  res.status(200).json({
    "ownerDetails":ownerDetails
  });
};

exports.postSignupOwner = postSignupOwner;