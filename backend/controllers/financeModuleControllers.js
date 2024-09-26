const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
// const { saveWingQuery, saveRoomQuery, createRoomLinkQuery, saveMaintainanceHeadQuery } = require("../dbUtils/societyRegistrationQueries");

const jwt = require('jsonwebtoken');

//Get transactions between two dates
const getTransactions = async (req, res, next) => {
  const id = req.userData.userId;
  const { fromDate, toDate } = req.body;
  console.log(id);
  console.log(fromDate);
  console.log(toDate);
}

//Post transaction with types
//Refund Logic
//Manual entry(With cheque suspended state)
//Balance sheet(joining all the tables including refund)

exports.getTransactions = getTransactions;
