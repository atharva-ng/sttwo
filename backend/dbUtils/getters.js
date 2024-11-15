const pool = require('./db');
const HttpError = require("../models/http-error");


const getOwnersDataFromSocietyIDQuery = async (client, soc_id) => {
  try {
    const result = await client.query("select * from getownersdata($1);", [
      soc_id
    ]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-getOwnersDataQuery", 500);
  }
}

const getWingRoomDataQuery = async (client, soc_id) => {
  try {
    const result = await client.query('SELECT * FROM getWingRoomsData($1);', [
      soc_id
    ]);
    return result.rows;
  } catch (error) {
    console.log(err);
    throw new HttpError("Something went wrong-getWingDataQuery", 500);
  }
};

const getAdminStatus = async (client, soc_id) => {
  try {
    const result = await client.query('SELECT isadmin FROM societydetails WHERE id =($1);', [
      soc_id
    ]);
    return result.rows;
  }catch(error){
    throw new HttpError("Something went wrong-getAdminStatus", 500);
  }
}


// Choice :1 - id:owner id
// Choice :2 - id:room details id
// Choice :3 - id:room transaction id
//Returns and array. If array has -1, it means no data is found.
const getSocietyId = async (id, choice) =>{
  try{
    const result = await pool.query('SELECT * FROM getsocietydetailsid($1,$2);', [
      id,
      choice
    ]);
    
    return result.rows[0].getsocietydetailsid;
  }catch(error){
    throw new HttpError("Something went wrong-getSocietyId", 500);
  }
}


module.exports = { getOwnersDataFromSocietyIDQuery, getWingRoomDataQuery, getSocietyId,getAdminStatus};

