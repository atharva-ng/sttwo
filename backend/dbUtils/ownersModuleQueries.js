const HttpError = require("../models/http-error");



const saveOwnerDataQuery = async (client, ownerData) => {
  try {
    const result = await client.query("SELECT saveOwnerDetails($1::jsonb);", [await JSON.stringify(await ownerData)]);
    console.log(result.rows[0].saveownerdetails);
    return {
      "idList": result.rows[0].saveownerdetails.ids,
      "noticeList": result.rows[0].saveownerdetails.notice,
    }
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-saveOwnerDataQuery", 500);
  }
}


module.exports = { saveOwnerDataQuery };


