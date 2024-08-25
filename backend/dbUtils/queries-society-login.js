const pool = require('./db');
const HttpError = require("../models/http-error");

const {verifyPassword} = require("./passwords");

const loginQuery=async (email, password)=>{
  try{
    const result = await pool.query("SELECT id FROM societydetails WHERE email = $1;", [email]);
    if(result.rows.length==0){
      throw new HttpError("Invalid credentials", 401);
    }
    const hashedPassword = await pool.query('SELECT password FROM societypasswords WHERE id = $1;', [result.rows[0].id]);
    hashedPasswordExtracted=hashedPassword.rows[0].password;
    const bool= await verifyPassword(password, hashedPasswordExtracted);
    return bool;
  }catch(err){
    throw err;
  }
};

module.exports = { loginQuery };