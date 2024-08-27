const HttpError = require("../models/http-error");
const {loginQuery} = require("../dbUtils/queries-society-login");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');

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
    const id = await loginQuery(emailAddress, password,1);
    if(id==-1){
      throw new HttpError("Invalid credentials", 401);
    }

    let token;
    try{
      token = jwt.sign(
        {userId: id, email: emailAddress},
        'authentacationkey_12987655434',
        {expiresIn: '1h'}
      );
    }catch{
      if(!isValid){
        throw new HttpError("Unable to login", 500);
      }
    }
    res.status(200).json({"token":token});
  }catch(err){
    if(err instanceof HttpError){
      return next(err);
    }else{
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};

exports.societyLogin = societyLogin;