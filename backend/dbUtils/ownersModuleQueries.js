const pool = require('./db');
const HttpError = require("../models/http-error");

const getWingDataQuery = async (soc_id) => {
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

const saveOwnerDataQuery = async (ownerData) => {
  console.log(ownerData.slice(0, 40));
  try {
    const result = await pool.query("SELECT saveOwnerDetails($1::jsonb);", [await JSON.stringify(await ownerData.slice(0, 40))]);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-saveOwnerDataQuery", 500);
  }
}
module.exports = { getWingDataQuery, saveOwnerDataQuery };


