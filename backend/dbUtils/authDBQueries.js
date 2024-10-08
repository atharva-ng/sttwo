const pool = require('./db');
const HttpError = require("../models/http-error");

const { hashPassword, verifyPassword } = require("./passwords");


const getRoomSizeQuery = async () => {
  try {
    const result = await pool.query('SELECT id,size FROM roomsize;');
    console.log();
    return result.rows;
  } catch (err) {
    throw new HttpError("Something went wrong", 500);
  }
};

const getMaintenanceHeadsQuery = async () => {
  try {
    const result = await pool.query('SELECT heads FROM maintenance_heads;');
    const maintenanceHeadsList = result.rows.map(row => row.heads);
    return maintenanceHeadsList;
  } catch (err) {
    throw new HttpError("Something went wrong- getMaintenanceHeadsQuery", 500);
  }
};

const postSocietyDetailsQuery = async (societyDetails) => {
  try {
    const res = await pool.query('CALL insertsociety($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);', [societyDetails.name,
    societyDetails.emailAddress,
    societyDetails.address,
    societyDetails.city,
    societyDetails.state,
    societyDetails.pincode,
    societyDetails.dateOfEstablishment,
    societyDetails.registrationNumber,
    societyDetails.phoneNumber,
      null]);

    newId = res.rows[0].new_id;
    if (newId === null) {
      throw new HttpError("Email already exists", 422);
    } else {
      const hashedPassword = await hashPassword(societyDetails.password);

      try {
        const result = await pool.query('CALL insertpassword($1, $2, 1, $3);', [
          newId,
          hashedPassword,
          null
        ]);
        console.log(result);
      } catch (err) {
        throw new HttpError("Failed to save the password.", 500);
      }
    }
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError("Something went wrong", 500);
    }
  }
};

const loginQuery = async (email, password, choice) => {
  if (choice != 1) {
    throw new HttpError("Something went wrong", 500);
  }
  try {
    const result = await pool.query("CALL getemaillogin($1,$2, $3);", [email, choice, null]);
    if (result.rows[0].idout === null) {
      throw new HttpError("Invalid credentials", 401);
    }
    const hashedPassword = await pool.query('SELECT password FROM societypasswords WHERE id = $1;', [result.rows[0].idout]);

    const bool = await verifyPassword(password, hashedPassword.rows[0].password);
    if (bool) {
      return result.rows[0].idout;
    } else {
      return -1;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { getRoomSizeQuery, getMaintenanceHeadsQuery, postSocietyDetailsQuery, loginQuery };