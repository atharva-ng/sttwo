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

const saveOwnerDataQuery = async (client, ownerData) => {
  try {
    const result = await client.query("SELECT saveOwnerDetails($1::jsonb);", [await JSON.stringify(await ownerData)]);
    console.log(result.rows[0].saveownerdetails);
    return {
      "idList": result.rows[0].saveownerdetails.ids,
      "noticeList": result.rows[0].saveownerdetails.notice,
    }
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-saveOwnerDataQuery", 500);
  }
}

const getOwnersDataQuery = async (soc_id) => {
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
module.exports = { getWingDataQuery, saveOwnerDataQuery, getOwnersDataQuery };


