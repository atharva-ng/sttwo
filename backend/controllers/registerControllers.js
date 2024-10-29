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
  try {
    societyID=await postSocietyDetailsQuery(societyDetails);
    if(societyID===null){
      throw new HttpError("Failed to save society details", 500);
    }
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      return next(new HttpError("Something went wrong-saving society", 500))
    }
  }
  
  //Iterating over wings
  try {
    for (let i = 1; i <= numberOfWings; i++) {
      //For every wing
      const dbObj=req.body.wingInformation[i];
      const wingId = await saveWingQuery(societyID, dbObj.name, dbObj.roomsPerFloor);

      if (wingId === null) {
        throw new HttpError("Failed to save wing", 500);
      }
      
      const floors = dbObj.floors;
      const roomsPerFloor = dbObj.roomsPerFloor;

      const roomLinkIds = {};
      for (let j = 1; j <= roomsPerFloor; j++) {
        const roomSizeID= Number(dbObj.roomDetails[j].roomSize);
        const id = await createRoomLinkQuery(roomSizeID, wingId);
        roomLinkIds[`${roomSizeID}-${dbObj.roomDetails[j].roomNumber}`] = id;
        await savemaintenanceHeadQuery(id, dbObj.roomDetails[j].maintenanceHeadAmount);
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

      await saveRoomQuery(rooms);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof HttpError) {
      throw error;
    } else {
      throw new HttpError("Something went wrong-controller", 500);
    }
  }
  return res.status(200).json({
    "message": "Success"
  });
}

const getRegisterSociety = async (req, res, next) => {
  try {
    const [roomSizes, maintenanceHeads] = await Promise.all([getRoomSizeQuery(), getMaintenanceHeadsQuery()]);
    // const varm=await getSocietyId(130,3);
    // console.log(varm);
    res.status(200).json({
      "roomSizes": roomSizes,
      "maintenanceHeads": maintenanceHeads
    });
  } catch (err) {
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }
}

exports.registerSociety = registerSociety;
exports.getRegisterSociety = getRegisterSociety;
