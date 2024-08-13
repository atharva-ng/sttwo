const HttpError = require("../models/http-error");
const {loginQuery} = require("../dbUtils/queries-society-login");

const { validationResult } = require("express-validator");

const societyLogin=async (req,res,next)=>{
  const errors= validationResult(req);
  
  if(!errors.isEmpty()){
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {email, password} = req.body;
  console.log(password);

  try{
    const isValid = await loginQuery(email, password);
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