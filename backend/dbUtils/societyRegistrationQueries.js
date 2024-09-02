const pool = require('./db');
const HttpError = require("../models/http-error");

const {getRoomSizeQuery} =require("./authDBQueries");

const  saveWingQuery=async (societyID, name, roomsPerFloor)=>{
  // console.log(societyID);
  // console.log(typeof societyID);
  try{
    const result= await pool.query('CALL savewing($1,$2,$3,$4);', [
      societyID,
      name,
      roomsPerFloor,
      null]);
      return result.rows[0].idout;
  }catch(err){
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }
};

const  saveRoomQuery=async (roomsDB)=>{
  try{
    // roomsDB='[{"wingId":55,"roomSize":2,"roomNumber":301,"maintainanceAmount":5000}]';
    // const jsonData= JSON.stringify(roomsDB);

    // const result= await pool.query('CALL saverooms($1);', [
    //   jsonData]);

    for (const element of roomsDB) {
      console.log(element.wingID);
      await pool.query(
        'INSERT INTO roomdetails(id, wing_id, room_size_id, room_no, amount) VALUES (default, $1, $2, $3, $4);',
        [
          element.wingId,
          element.roomSize,
          element.roomNumber,
          element.maintainanceAmount
        ]
      );
    }

    // console.log(result);
  }catch(err){
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }
};

module.exports = {saveWingQuery,saveRoomQuery };