const HttpError = require("../models/http-error");
const {getRoomSizeQuery, getMaintenanceHeadsQuery,postSocietyDetailsQuery} = require("../dbUtils/queries-society-signup");

const { validationResult } = require("express-validator");

const getSignupSociety = async (req,res,next) => {
  try{
    const [roomSizes, maintainanceHeads]= await Promise.all([getRoomSizeQuery(), getMaintenanceHeadsQuery()]);
    res.status(200).json({
      "roomSizes":roomSizes,
      "maintainanceHeads":maintainanceHeads
    });
  }catch{
    throw new HttpError("Something went wrong", 500);
  }
}

const postSignupSociety = async (req,res,next) => {
  const errors= validationResult(req);
  
  if(!errors.isEmpty()){
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {name, dateOfEstablishment, emailAddress, password, phoneNumber, address, city, state, pincode, numberOfWings, registrationNumber} = req.body;
  console.log(password);
  const societyDetails = {
    "name": name,
    "dateOfEstablishment":dateOfEstablishment,
    "emailAddress":emailAddress,
    "password":password,
    "phoneNumber":phoneNumber,
    "address":address,
    "city":city,
    "state":state,
    "pincode":pincode,
    "numberOfWings":numberOfWings,
    "registrationNumber":registrationNumber
  }

  try{
    await postSocietyDetailsQuery(societyDetails);
  }catch(err){
    if(err instanceof HttpError){
      return next(err);
    }else{
      return next(new HttpError("Something went wrong", 500))
    }
  }
  res.status(200).json({
    "societyDetails":societyDetails
  });
};

exports.getSignupSociety = getSignupSociety;
exports.postSignupSociety = postSignupSociety;