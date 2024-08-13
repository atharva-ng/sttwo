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
    const result = await pool.query('SELECT id FROM societydetails WHERE email = $1;', [societyDetails.emailAddress]);
    if(result.rows.length>0){
      throw new HttpError("Email already exists", 422);
    }
  }catch(err){
    throw err;
  }
  try{
    const result = await pool.query('INSERT INTO societydetails VALUES(DEFAULT,$1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;', [
      societyDetails.name,
      societyDetails.emailAddress,
      societyDetails.address,
      societyDetails.city,
      societyDetails.state,
      societyDetails.pincode,
      societyDetails.dateOfEstablishment,
      societyDetails.registrationNumber,
      societyDetails.phoneNumber,
    ]);
    id=result.rows[0].id;

    const hashedPassword = await hashPassword(societyDetails.password);
    console.log(societyDetails.password);
    console.log(hashedPassword);
    
    await pool.query('INSERT INTO societypasswords VALUES($1, $2);', [
      id,
      hashedPassword
    ]);
    
  }catch(err){
    if(err instanceof HttpError){
      throw err;
    }else{
      console.log(err);
      throw new HttpError("Something went wrong", 500);
    }
  }
};

module.exports = { getRoomSizeQuery, getMaintenanceHeadsQuery,postSocietyDetailsQuery };