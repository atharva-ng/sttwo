const pool = require('./db');
const HttpError = require("../models/http-error");

const { hashPassword, verifyPassword } = require("./passwords");


// Function to get room sizes from the 'roomsize' table
const getRoomSizeQuery = async () => {
  try {
    const result = await pool.query('SELECT id,size FROM roomsize;');
    console.log();
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getRoomSizeQuery", 500);
    }
  }
};

// Function to get the maintenance heads from the 'maintenance_heads' table
const getMaintenanceHeadsQuery = async () => {
  try {
    const result = await pool.query('SELECT * FROM maintenance_heads;');
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong- getMaintenanceHeadsQuery", 500);
    }
  }
};

// Function to insert society details into the database
const postSocietyDetailsQuery = async (client, societyDetails) => {
  try {
    const res = await client.query('CALL insertsociety($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);', [societyDetails.name,
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
        // console.log(result);
      } catch (err) {
        throw new HttpError("Failed to save the password.", 500);
      }
    }

    return newId;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong", 500);
    }
  }
};

// Function to handle user login
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
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-loginQuery", 500);
    }
  }
};

const updateSocietyDetailsQuery = async(userId,isadmin)=>{
  try {
    const result = await pool.query("SELECT * FROM update_societydetails($1,$2);", [userId, isadmin]);
   
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-updateSocietyDetailsQuery", 500);
    }
  }
}

module.exports = { getRoomSizeQuery, getMaintenanceHeadsQuery, postSocietyDetailsQuery, loginQuery, updateSocietyDetailsQuery };