const pool = require('../dbUtils/db');
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const { saveWingQuery, saveRoomQuery, createRoomLinkQuery, savemaintenanceHeadQuery } = require("../dbUtils/societyRegistrationQueries")
const { postSocietyDetailsQuery } = require("../dbUtils/authDBQueries");
const { getRoomSizeQuery, getMaintenanceHeadsQuery } = require("../dbUtils/authDBQueries");


const genRooms = async (roomData, floors, roomsPerFloor) => {
  rooms = []
  const str = String(roomData.room_no);
  let initial = parseInt(str.substring(0, 1));

  if (str.length > 1) {
    const rest = str.substring(1);
    for (let k = initial; k <= Number(floors)+Number(initial)-1; k++) {
      rooms.push({
        "roomLink": roomData.roomlink_id,
        "roomNumber": parseInt(String(k) + rest),
        "maintenanceAmount": roomData.amount
      });
    }
  } else {
    for (let k = 1; k <= floors; k++) {
      rooms.push({
        "roomLink": roomData.roomlink_id,
        "roomNumber": Number(roomData.room_no) + Number(roomsPerFloor * (k - 1)),
        "maintenanceAmount": roomData.amount
      });
    }
  }
  return rooms;
};

const registerSociety = async (req, res, next) => {
  const errors = validationResult(req);

  
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const { name, dateOfEstablishment, emailAddress, password, phoneNumber, address, city, state, pincode, numberOfWings, registrationNumber } = req.body.societyDetails;

  const societyDetails = {
    "name": name,
    "dateOfEstablishment": dateOfEstablishment,
    "emailAddress": emailAddress,
    "password": password,
    "phoneNumber": phoneNumber,
    "address": address,
    "city": city,
    "state": state,
    "pincode": pincode,
    "numberOfWings": numberOfWings,
    "registrationNumber": registrationNumber
  }
  var societyID;

  var client;
  try{
    client = await pool.connect();
  }catch(err){
    // console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }

  
  //Iterating over wings
  try {
    await client.query('BEGIN');

    societyID=await postSocietyDetailsQuery(client, societyDetails);
    if(societyID===null){
      next( new HttpError("Failed to save society details", 500));
    }

    for (let i = 1; i <= numberOfWings; i++) {
      //For every wing
      const dbObj=req.body.wingInformation[i];
      const wingId = await saveWingQuery(client, societyID, dbObj.name, dbObj.roomsPerFloor);

      if (wingId === null) {
        next( new HttpError("Failed to save wing", 500));
      }
      
      const floors = dbObj.floors;
      const roomsPerFloor = dbObj.roomsPerFloor;

      const roomLinkIds = {};
      for (let j = 1; j <= roomsPerFloor; j++) {
        const roomSizeID= Number(dbObj.roomDetails[j].roomSize);
        const id = await createRoomLinkQuery(client, roomSizeID, wingId);
        roomLinkIds[`${roomSizeID}-${dbObj.roomDetails[j].roomNumber}`] = id;
        await savemaintenanceHeadQuery(client, id, dbObj.roomDetails[j].maintenanceHeadAmount);
      }


      let rooms = [];
      for (let j = 1; j <= roomsPerFloor; j++) {
        rooms.push(...await genRooms(
          {
            "roomlink_id": roomLinkIds[`${Number(dbObj.roomDetails[j].roomSize)}-${dbObj.roomDetails[j].roomNumber}`],
            "room_no": dbObj.roomDetails[j].roomNumber,
            "amount": dbObj.roomDetails[j].maintenanceAmount
          }
          , floors, roomsPerFloor));
      }

      await saveRoomQuery(client ,rooms);

      await client.query('COMMIT');
      return res.status(200).json({
        "message": "Success"
      });
    }
  } catch (error) {
    await client.query('ROLLBACK');
    // console.log(error);
    if (error instanceof HttpError) {
      next( error);
    } else {
      next( new HttpError("Something went wrong-controller", 500));
    }
  }finally{
    client.release();
  }
}

const getRegisterSociety = async (req, res, next) => {
  var client;
  try{
    client = await pool.connect();
  }catch(err){
    // console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
  
  try {
    await client.query('BEGIN'); 
    const [roomSizes, maintenanceHeads] = await Promise.all([getRoomSizeQuery(client), getMaintenanceHeadsQuery(client)]);
    await client.query('COMMIT');
    res.status(200).json({
      "roomSizes": roomSizes,
      "maintenanceHeads": maintenanceHeads
    });
  } catch (err) {
    await client.query('ROLLBACK');
    // console.log(err);
    next( new HttpError("Something went wrong", 500));
  }finally{
    client.release();
  }
}

exports.registerSociety = registerSociety;
exports.getRegisterSociety = getRegisterSociety;
