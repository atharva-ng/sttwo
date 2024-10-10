const pool = require('./db');
const HttpError = require("../models/http-error");

const createNoticeQuery = async (title, content, start_date, end_date, userId) => {
  try {
    const result = await pool.query('CALL createNotice($1,$2,$3,$4,$5,$6);', [
      title, content, start_date, end_date, userId, null
    ]);
    
    return result.rows;
  } catch (error) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      throw new HttpError("Something went wrong-createNoticeQuery", 500);
    }
  }
};

module.exports = { createNoticeQuery };


