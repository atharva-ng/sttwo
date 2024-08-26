const pool = require('./db');
const HttpError = require("../models/http-error");

const {verifyPassword} = require("./passwords");

const loginQuery=async (email, password)=>{
  try{
    const result = await pool.query("CALL getemailsocietylogin($1,$2);", [email,null]);
    if(result.rows[0].idout===null){
      throw new HttpError("Invalid credentials", 401);
    }
    const hashedPassword = await pool.query('SELECT password FROM societypasswords WHERE id = $1;', [result.rows[0].idout]);
    hashedPasswordExtracted=hashedPassword.rows[0].password;
    const bool= await verifyPassword(password, hashedPasswordExtracted);
    return bool;
  }catch(err){
    throw err;
  }
};

module.exports = { loginQuery };