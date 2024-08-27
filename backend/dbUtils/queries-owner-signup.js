const pool = require('./db');
const HttpError = require("../models/http-error");

const {hashPassword} = require("./passwords");

const postOwnerDetailsQuery=async (ownerDetails)=>{
  try{
    const res= await pool.query('CALL insertOwner($1,$2,$3,$4,$5);', [
      ownerDetails.firstName,
      ownerDetails.lastName,
      ownerDetails.emailAddress,
      ownerDetails.phoneNumber,
      null]);
    
    newId= res.rows[0].new_id;
    if(newId===null){
      throw new HttpError("Email already exists", 422);
    }else{
      const hashedPassword = await hashPassword(ownerDetails.password);

      try{
        const result = await pool.query('CALL insertpassword($1, $2, 2, $3);', [
          newId,
          hashedPassword,
          null
        ]);
        console.log(result);
      }catch(err){
        throw new HttpError("Failed to save the password.", 500);
      }
    }
  }catch(err){
    if(err instanceof HttpError){
      throw err;
    }else{
      throw new HttpError("Something went wrong", 500);
    }
  }
};

module.exports = { postOwnerDetailsQuery };