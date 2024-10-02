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
    throw new HttpError(err, 500);
  }
};

module.exports = { getWingDataQuery };


