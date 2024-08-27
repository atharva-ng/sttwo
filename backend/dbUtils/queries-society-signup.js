const pool = require('./db');
const HttpError = require("../models/http-error");

const {hashPassword} = require("./passwords");

const  getRoomSizeQuery=async ()=>{
  try{
    const result = await pool.query('SELECT size FROM roomsize;');
    const roomSizeList= result.rows.map(roomSize => roomSize.size);
    return roomSizeList;
  }catch(err){
    throw new HttpError("Something went wrong", 500);
  }
};

const getMaintenanceHeadsQuery=async ()=>{
  try{
    const result =await pool.query('SELECT heads FROM maintenance_heads;');
    const maintenanceHeadsList= result.rows.map(row => row.heads);
    return maintenanceHeadsList;
  }catch(err){
    throw new HttpError("Something went wrong", 500);
  }
};

const postSocietyDetailsQuery=async (societyDetails)=>{
  try{
    const res= await pool.query('CALL insertsociety($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);', [societyDetails.name,
      societyDetails.emailAddress,
      societyDetails.address,
      societyDetails.city,
      societyDetails.state,
      societyDetails.pincode,
      societyDetails.dateOfEstablishment,
      societyDetails.registrationNumber,
      societyDetails.phoneNumber,
      null]);
    
    newId= res.rows[0].new_id;
    if(newId===null){
      throw new HttpError("Email already exists", 422);
    }else{
      const hashedPassword = await hashPassword(societyDetails.password);

      try{
        const result = await pool.query('CALL insertpassword($1, $2, 1, $3);', [
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

module.exports = { getRoomSizeQuery, getMaintenanceHeadsQuery,postSocietyDetailsQuery };