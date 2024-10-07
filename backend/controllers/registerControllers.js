const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const { saveWingQuery, saveRoomQuery, createRoomLinkQuery, saveMaintainanceHeadQuery } = require("../dbUtils/societyRegistrationQueries")
const { getRoomSizeQuery, getMaintenanceHeadsQuery } = require("../dbUtils/authDBQueries");

const jwt = require('jsonwebtoken');

const numberOfWings = 4;
const societyID = 75;
const reqObj = {
  "wingInformation": {
    "1": {
      "name": "wing1",
      "floors": 10,
      "roomsPerFloor": 4,
      "roomDetails": {
        "1": {
          "roomNumber": 101,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "2": {
          "roomNumber": 102,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        },
        "3": {
          "roomNumber": 103,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },

        },
        "4": {
          "roomNumber": 104,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        }
      }
    },
    "2": {
      "name": "wing2",
      "floors": 10,
      "roomsPerFloor": 4,
      "roomDetails": {
        "1": {
          "roomNumber": 101,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "2": {
          "roomNumber": 102,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        },
        "3": {
          "roomNumber": 103,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "4": {
          "roomNumber": 104,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        }
      }
    },
    "3": {
      "name": "wing3",
      "floors": 10,
      "roomsPerFloor": 4,
      "roomDetails": {
        "1": {
          "roomNumber": 101,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "2": {
          "roomNumber": 102,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        },
        "3": {
          "roomNumber": 103,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "4": {
          "roomNumber": 104,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        }
      }
    },
    "4": {
      "name": "wing4",
      "floors": 10,
      "roomsPerFloor": 4,
      "roomDetails": {
        "1": {
          "roomNumber": 101,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "2": {
          "roomNumber": 102,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        },
        "3": {
          "roomNumber": 103,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
          },
        },
        "4": {
          "roomNumber": 104,
          "roomSize": "2BHK",
          "maintainanceAmount": 7500,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000,
            "5": 2500
          },
        }
      }
    }
  }
}

const sizeToId = (roomSizeArray, size) => {
  const room = roomSizeArray.find(room => room.size === size);
  return room ? room.id : null;
};

const genRooms = async (roomData, floors, roomsPerFloor) => {
  rooms = []
  const str = String(roomData.room_no);
  let initial = parseInt(str.substring(0, 1));

  if (str.length > 1) {
    const rest = str.substring(1);
    for (let k = initial; k <= floors; k++) {
      rooms.push({
        "roomLink": roomData.roomlink_id,
        "roomNumber": parseInt(String(k) + rest),
        "maintainanceAmount": roomData.amount
      });
    }
  } else {
    for (let k = 1; k <= floors; k++) {
      rooms.push({
        "roomLink": roomData.roomlink_id,
        "roomNumber": roomData.room_no + (roomsPerFloor * (k - 1)),
        "maintainanceAmount": roomData.amount
      });
    }
  }
  return rooms;
};

const registerSociety = async (req, res, next) => {
  //Iterating over wings
  try {
    for (let i = 1; i <= numberOfWings; i++) {
      //For every wing
      const dbObj = reqObj.wingInformation[i];
      const wingId = await saveWingQuery(societyID, dbObj.name, dbObj.roomsPerFloor);

      if (wingId === null) {
        throw new HttpError("Failed to save wing", 500);
      }

      const roomSizes = await getRoomSizeQuery();
      const floors = dbObj.floors;
      const roomsPerFloor = dbObj.roomsPerFloor;

      const roomLinkIds = {};
      for (let j = 1; j <= roomsPerFloor; j++) {
        const roomSizeID = sizeToId(roomSizes, dbObj.roomDetails[j].roomSize);
        const id = await createRoomLinkQuery(roomSizeID, wingId);
        roomLinkIds[`${roomSizeID}-${dbObj.roomDetails[j].roomNumber}`] = id;
        await saveMaintainanceHeadQuery(id, dbObj.roomDetails[j].maintainanceHeadAmount);
      }

      let rooms = [];
      for (let j = 1; j <= roomsPerFloor; j++) {
        rooms.push(...await genRooms(
          {
            "roomlink_id": roomLinkIds[`${sizeToId(roomSizes, dbObj.roomDetails[j].roomSize)}-${dbObj.roomDetails[j].roomNumber}`],
            "room_no": dbObj.roomDetails[j].roomNumber,
            "amount": dbObj.roomDetails[j].maintainanceAmount
          }
          , floors, roomsPerFloor));
      }

      await saveRoomQuery(rooms);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof HttpError) {
      throw err;
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
    const [roomSizes, maintainanceHeads] = await Promise.all([getRoomSizeQuery(), getMaintenanceHeadsQuery()]);
    res.status(200).json({
      "roomSizes": roomSizes,
      "maintainanceHeads": maintainanceHeads
    });
  } catch (err) {
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }
}

exports.registerSociety = registerSociety;
exports.getRegisterSociety = getRegisterSociety;
