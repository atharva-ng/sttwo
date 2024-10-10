const pool = require('./db');
const HttpError = require("../models/http-error");

const createNoticeQuery = async (title, content, start_date, end_date, userId) => {
  try {
    const result = await pool.query('CALL createNotice($1,$2,$3,$4,$5,$6);', [
      title, content, start_date, end_date, userId, null
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createNoticeQuery", 500);
    }
  }
};

const getNoticesQuery = async (userId, active) => {
  try {
    console.log(active);
    const result = await pool.query('SELECT * FROM getnotices($1, $2);', [
      userId,
      active
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getNoticesQuery", 500);
    }
  }
};

module.exports = { createNoticeQuery,getNoticesQuery };


