const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');


const getSocietyProfile = async (req,res,next) => {
  const id=req.userData.userId;
  const bool= false;
  if(bool){
    //get all the data regarding the society.
    return res.status(200).json({
      "message":"Registration completed",
      "action": 1,
      "id": id
    });
  }else{
    return res.status(200).json({
      "message":"Registration Required",
      "action": 2,
      "id": id
    });
  }
}


exports.getSocietyProfile = getSocietyProfile;
