const pool = require('./db');
const bcrypt = require('bcrypt');
const HttpError = require("../models/http-error");

async function hashPassword(password) {
  const saltRounds = 10;
  try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
  } catch (error) {
    throw new HttpError(err, 500);
  }
}

async function verifyPassword(password, hashedPassword) {
  try{
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }catch (error) {
    throw new HttpError(err, 500);
  }
}

module.exports = { hashPassword, verifyPassword };