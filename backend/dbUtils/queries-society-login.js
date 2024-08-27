const pool = require('./db');
const HttpError = require("../models/http-error");

const {verifyPassword} = require("./passwords");

const loginQuery=async (email, password, choice)=>{
  try{
    const result = await pool.query("CALL getemaillogin($1,$2, $3);", [email, choice,null]);
    if(result.rows[0].idout===null){
      throw new HttpError("Invalid credentials", 401);
    }
    let hashedPassword;
    if(choice == 1){
      hashedPassword = await pool.query('SELECT password FROM societypasswords WHERE id = $1;', [result.rows[0].idout]);
    }else if(choice == 2) {
      hashedPassword = await pool.query('SELECT password FROM ownerpasswords WHERE id = $1;', [result.rows[0].idout]);
    }else{
      throw new HttpError("Something went wrong", 500);
    }

    const bool= await verifyPassword(password, hashedPassword.rows[0].password);
    if(bool){
      return result.rows[0].idout;
    }else{
      return -1;
    }
  }catch(err){
    throw err;
  }
};

module.exports = { loginQuery };