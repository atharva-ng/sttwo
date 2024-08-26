const HttpError = require("../models/http-error");
const {loginQuery} = require("../dbUtils/queries-society-login");

const { validationResult } = require("express-validator");

const societyLogin=async (req,res,next)=>{
  console.log(req);
  const errors= validationResult(req);
  
  if(!errors.isEmpty()){
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {emailAddress, password} = req.body;

  try{
    const isValid = await loginQuery(emailAddress, password);
    if(!isValid){
      throw new HttpError("Invalid credentials", 401);
    }
    res.status(200).json({"message":"Login successful"});
  }catch(err){
    if(err instanceof HttpError){
      return next(err);
    }else{
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
  }}
};

exports.societyLogin = societyLogin;