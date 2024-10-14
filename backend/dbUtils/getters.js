const pool = require('./db');
const HttpError = require("../models/http-error");


const getOwnersDataFromSocietyIDQuery = async (soc_id) => {
  try {
    const result = await pool.query("select * from getownersdata($1);", [
      soc_id
    ]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-getOwnersDataQuery", 500);
  }
}

const getWingRoomDataQuery = async (soc_id) => {
  try {
    const result = await pool.query('SELECT * FROM getWingRoomsData($1);', [
      soc_id
    ]);
    return result.rows;
  } catch (error) {
    console.log(err);
    throw new HttpError("Something went wrong-getWingDataQuery", 500);
  }
};

const getAdminStatus = async (soc_id) => {
  try {
    const result = await pool.query('SELECT isadmin FROM societydetails WHERE id =($1);', [
      soc_id
    ]);
    return result.rows;
  }catch(error){
    throw new HttpError("Something went wrong-getAdminStatus", 500);
  }
}

module.exports = { getOwnersDataFromSocietyIDQuery, getWingRoomDataQuery, getAdminStatus};