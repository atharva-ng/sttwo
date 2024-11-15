const pool = require('../dbUtils/db');
const HttpError = require("../models/http-error");

const {  loginQuery, updateSocietyDetailsQuery } = require("../dbUtils/authDBQueries");
// const {getAdminStatus}= require("../dbUtils/getters");

const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');

const societyLogin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { emailAddress, password } = req.body;

  var client;

  try{
    client = await pool.connect();
  }catch(err){
    // console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }

  try {
    await client.query('BEGIN');
    const id = await loginQuery(client,emailAddress, password, 1);
    if (id == -1) {
      throw new HttpError("Invalid credentials", 401);
    }

    let adminStatus = await getAdminStatus(id);
    adminStatus=adminStatus[0].isadmin;

    let token;
    try {
      token = jwt.sign(
        {
          userId: id,
          isAdmin: adminStatus
        },
        'authentacationkey_12987655434',
        { expiresIn: '1h' }
      );
    } catch (err) {
      throw new HttpError("Unable to login", 500);
    }

    await client.query('COMMIT');
    return res.status(200).json({ "token": token, "isAdmin": adminStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }finally{
    client.release();
  }
};

const updateSocietyDetails= async (req, res, next) => {
  const userId=req.userData.userId;

  const {isadmin } = req.body;

  var client;

  try{
    client = await pool.connect();
  }catch(err){
    // console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }

  try{
    await client.query('BEGIN');
    const noticeData = await updateSocietyDetailsQuery(client, userId, isadmin);
    await client.query('COMMIT');
    return res.status(200).json({"message": "Success"});
  }catch (error) {
    await client.query('ROLLBACK');
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }finally{
    await client.release();
  }
}

exports.societyLogin = societyLogin;
exports.updateSocietyDetails=updateSocietyDetails;