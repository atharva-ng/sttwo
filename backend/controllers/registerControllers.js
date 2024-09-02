const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const {saveWingQuery, saveRoomQuery} =require("../dbUtils/societyRegistrationQueries")
const {getRoomSizeQuery} =require("../dbUtils/authDBQueries");

const jwt = require('jsonwebtoken');

const numberOfWings=4;
const societyID=52;
const reqObj={
  "wingInformation":{
    "1":{
      "name":"wing1",
      "floors":10,
      "roomsPerFloor":4,
      "roomDetails":{
        "1":{
          "roomNumber":101,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "2":{
          "roomNumber":102,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        },
        "3":{
          "roomNumber":103,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "4":{
          "roomNumber":104,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        }
      }
    },
    "2":{
      "name":"wing2",
      "floors":10,
      "roomsPerFloor":4,
      "roomDetails":{
        "1":{
          "roomNumber":301,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "2":{
          "roomNumber":302,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        },
        "3":{
          "roomNumber":303,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "4":{
          "roomNumber":304,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        }
      }
    },
    "3":{
      "name":"wing3",
      "floors":3,
      "roomsPerFloor":4,
      "roomDetails":{
        "1":{
          "roomNumber":1,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "2":{
          "roomNumber":2,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        },
        "3":{
          "roomNumber":3,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "4":{
          "roomNumber":4,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        }
      }
    },
    "4":{
      "name":"wing4",
      "floors":10,
      "roomsPerFloor":4,
      "roomDetails":{
        "1":{
          "roomNumber":101,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "2":{
          "roomNumber":102,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        },
        "3":{
          "roomNumber":103,
          "roomSize":"1BHK",
          "maintainanceAmount": 5000,
        },
        "4":{
          "roomNumber":104,
          "roomSize":"2BHK",
          "maintainanceAmount": 7500,
        }
      }
    }
  }
}

const sizeToId=(roomSizeArray, size )=>{
  const room = roomSizeArray.find(room => room.size === size);
  return room ? room.id : null;
};

const genRooms=(roomData, floors, roomsPerFloor)=>{
  rooms=[]
  const str=String(roomData.room_no);
  let initial =parseInt(str.substring(0,1));

  if(str.length>1){
    const rest=str.substring(1);
    for(let k=initial;k<=floors;k++){
      rooms.push({ 
          "wingId": roomData.wing_id,
          "roomSize": roomData.room_size_id, 
          "roomNumber":parseInt(String(k)+rest), 
          "maintainanceAmount": roomData.amount 
        });
    }
  }else{
    for(let k=1;k<=floors;k++){
      rooms.push({ 
        "wingId": roomData.wing_id,
          "roomSize": roomData.room_size_id, 
          "roomNumber":roomData.room_no+(roomsPerFloor*(k-1)), 
          "maintainanceAmount": roomData.amount 
        });
    }
  }
  return rooms;
};

const registerSociety= async (req,res,next)=>{
  //Iterating over wings
  try{
    for(let i=1; i<=numberOfWings;i++ ){
      //For every wing
      const dbObj=reqObj.wingInformation[i];
      const wingId = await saveWingQuery(societyID, dbObj.name, dbObj.roomsPerFloor);
      const roomSize=await getRoomSizeQuery();
      
      // console.log(wingId);

      const floors=dbObj.floors;
      const roomsPerFloor=dbObj.roomsPerFloor;
  
      let rooms=[];
      for(let j=1;j<=roomsPerFloor;j++){
        rooms.push(...await genRooms(
          {
            "wing_id":wingId,
            "room_size_id":sizeToId(roomSize,dbObj.roomDetails[j].roomSize), 
            "room_no":dbObj.roomDetails[j].roomNumber,
            "amount": dbObj.roomDetails[j].maintainanceAmount}
          ,floors, roomsPerFloor));
      }

      await saveRoomQuery(rooms);
    }
  }catch(err){
    if(err instanceof HttpError){
      throw err;
    }else{
      throw new HttpError("Something went wrong", 500);
    }
  }
  return res.status(200).json({
    "message":"Success"
  });
}

exports.registerSociety = registerSociety;
