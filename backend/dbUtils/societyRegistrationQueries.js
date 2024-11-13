const HttpError = require("../models/http-error");

const saveWingQuery = async (client,societyID, name, roomsPerFloor) => {
  try {
    const result = await client.query('CALL savewing($1,$2,$3,$4);', [
      societyID,
      name,
      roomsPerFloor,
      null]);
    return result.rows[0].idout;
  } catch (err) {
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }
};


const createRoomLinkQuery = async (client, wingId, roomSizeId) => {
  try {
    const result = await client.query('CALL createlink($1,$2,$3);', [
      roomSizeId,
      wingId,
      null
    ]);

    return result.rows[0].new_id;

  } catch (err) {
    console.log(err);
    throw new HttpError("Failed to create room link", 500);
  }
}
const saveRoomQuery = async (client, roomsDB) => {
  try {
    for (const element of roomsDB) {
      await client.query(
        'INSERT INTO roomdetails(id,  roomlink_id, room_no, amount) VALUES (default, $1, $2, $3);',
        [
          element.roomLink,
          element.roomNumber,
          Number(element.maintainanceAmount)
        ]
      );
    }
  } catch (err) {
    console.log(err);
    throw new HttpError("Something went wrong-saveRoomQuery", 500);
  }
};


const savemaintenanceHeadQuery = async (client,roomLinkId, amountObj) => {
  const idList = []
  try {
    for (const [key, value] of Object.entries(amountObj)) {
      idList.push(await client.query(
        'call insertmaintainancehead($1,$2,$3,$4)',
        [
          roomLinkId,
          key,
          value,
          null
        ]
      ));
    };
    return idList;
  } catch (err) {
    console.log(err);
    throw new HttpError("Something went wrong", 500);
  }

}


module.exports = { saveWingQuery, createRoomLinkQuery, saveRoomQuery, savemaintenanceHeadQuery };