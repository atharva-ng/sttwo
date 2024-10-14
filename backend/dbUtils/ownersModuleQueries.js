const pool = require('./db');
const HttpError = require("../models/http-error");



const saveOwnerDataQuery = async (ownerData) => {
  console.log(ownerData);
  try {
    const result = await pool.query("SELECT saveOwnerDetails($1::jsonb);", [await JSON.stringify(await ownerData)]);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-saveOwnerDataQuery", 500);
  }
}


module.exports = { saveOwnerDataQuery };


